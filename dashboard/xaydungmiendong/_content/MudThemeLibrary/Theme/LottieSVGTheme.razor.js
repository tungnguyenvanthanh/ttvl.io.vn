export let LottieSVG = function () {

    const preload = async () => {
        // Nếu đã có Promise đang chạy hoặc đã load xong thì dùng lại
        if (window.__LottieSVG_loaderPromise) return window.__LottieSVG_loaderPromise;

        // Tạo Promise duy nhất để mọi component đều chờ vào đây
        window.__LottieSVG_loaderPromise = (async () => {
            await loadAsset({ type: "js", url: "_content/MudThemeLibrary/plugins/lottie/lottie.min.js", location: "body" });
        })();

        return window.__LottieSVG_loaderPromise;
    };

    let waitCheck = async () => {
        while (typeof window.lottie === "undefined") {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    let init = async (el, jsonUrl, loop, speed) => {
        if (el === null) {
            return;
        }

        await waitCheck();

        el.innerHTML = "";

        var animate = lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop: loop,
            autoplay: true,
            path: jsonUrl
        });

        animate.setSpeed(speed);
    }

    return {
        preload,
        init
    };
}();