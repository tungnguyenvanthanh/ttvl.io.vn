export let Cropperjs = function () {

    const preload = async () => {
        // Nếu đã có Promise đang chạy hoặc đã load xong thì dùng lại
        if (window.__cropperjs_loaderPromise) return window.__cropperjs_loaderPromise;

        // Tạo Promise duy nhất để mọi component đều chờ vào đây
        window.__cropperjs_loaderPromise = (async () => {
            await loadAsset({ type: "js", url: "_content/MudThemeLibrary/plugins/cropperjs/cropper.js", location: "body" });
            await loadAsset({ type: "css", url: "_content/MudThemeLibrary/plugins/cropperjs/cropper.css", location: "before" });
        })();

        return window.__cropperjs_loaderPromise;
    };

    let waitCheck = async () => {
        while (typeof window.Cropper === "undefined") {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    let init = async (imageRef) => {

        await waitCheck();

        let cropper = new Cropper(imageRef, {
            aspectRatio: 1,
            viewMode: 0,
        });

        return cropper;
    }

    let croppedCanvas = (cropper) => {
        let result = cropper["getCroppedCanvas"]();
        if (result instanceof HTMLCanvasElement) {
            return result.toDataURL("image/jpeg");
        }
    }

    let rotate = (cropper, option) => {
        cropper["rotate"](option, undefined);
        return cropper;
    }

    let scaleX = (cropper, option) => {
        cropper["scaleX"](option, undefined);
        return cropper;
    }

    let scaleY = (cropper, option) => {
        cropper["scaleY"](option, undefined);
        return cropper;
    }

    return {
        preload,
        init,
        croppedCanvas,
        rotate,
        scaleX,
        scaleY
    };
}();