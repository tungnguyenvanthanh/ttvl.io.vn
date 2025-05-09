export let CodeMirrorEditor = function () {

    const preload = async () => {
        // Nếu đã có Promise đang chạy hoặc đã load xong thì dùng lại
        if (window.__codemirror_loaderPromise) return window.__codemirror_loaderPromise;

        // Tạo Promise duy nhất để mọi component đều chờ vào đây
        window.__codemirror_loaderPromise = (async () => {
            // Bước 1: Core
            await loadAsset({ type: "js", url: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/codemirror.min.js", location: "body" });

            // 🆕 Bước 2: Mode con (cần thiết cho htmlmixed)
            await loadAsset({ type: "js", url: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/xml/xml.min.js", location: "body" });
            await loadAsset({ type: "js", url: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/javascript/javascript.min.js", location: "body" });
            await loadAsset({ type: "js", url: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/css/css.min.js", location: "body" });

            // Bước 3: htmlmixed (phải sau khi xml/js/css)
            await loadAsset({ type: "js", url: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/htmlmixed/htmlmixed.min.js", location: "body" });

            // Bước 4: CSS
            await loadAsset({ type: "css", url: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/codemirror.min.css", location: "before" });
            await loadAsset({ type: "css", url: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/theme/dracula.min.css", location: "before" });
        })();

        return window.__codemirror_loaderPromise;
    };

    let waitCheck = async () => {
        while (typeof window.CodeMirror === "undefined") {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    const init = async (textareaElement, dotNetHelper, mode) => {

        await waitCheck();

        const editorInstance = window.CodeMirror.fromTextArea(textareaElement, {
            lineNumbers: true,
            mode: mode || "htmlmixed",
            theme: "dracula"
        });

        if (!editorInstance) return;

        editorInstance.on("change", () => {
            const code = editorInstance.getValue();
            dotNetHelper.invokeMethodAsync("OnJsCodeChanged", code);
        });
    };

    return {
        preload,
        init
    };
}();