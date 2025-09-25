window.TTVLMudThemeLibrary = function () {
    const initScrollEvent = (dotNetHelper) => {
        window.onscroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                dotNetHelper.invokeMethodAsync('ScrollLoadMore');
            }
        };
    };

    const copyText = (element, dotNetHelper) => {
        navigator.clipboard.writeText(element.innerText)
            .then(() => {
                dotNetHelper.invokeMethodAsync('OnCopyText', element.innerText);
            })
            .catch(err => console.error("Failed to copy text:", err));
    };

    const beautifyHtml = async (html) => {
        let waitForHtmlBeautify = async () => {
            while (typeof html_beautify !== "function") {
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            return html_beautify;
        };

        const beautifier = await waitForHtmlBeautify();
        return beautifier(html, {
            indent_size: 4,
            wrap_line_length: Infinity, // Không ngắt xuống dòng. Nếu cho giá trị là 120, có nghĩa là dài hơn 120 ký tự sẽ tự động xuống dòng
            preserve_newlines: true
        });
    };

    const formatJson = async (code) => {
        try {
            return JSON.stringify(JSON.parse(code), null, 4);
        } catch (e) {
            console.warn('Invalid JSON, skipping beautify');
            return code;
        }
    };

    const formatCsharp = async (code) => {
        if (!code) {
            code = "";
        }
        const res = await fetch('https://server.ttvl.io.vn/api/format-code/csharp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(code)
        });
        return res.ok ? await res.text() : code;
    };

    const forceDownload = function (url, fileName) {
        fetch(url, { mode: 'cors' })
            .then(resp => resp.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName || "download";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    };

    return {
        initScrollEvent,
        copyText,
        beautifyHtml,
        formatJson,
        formatCsharp,
        forceDownload
    };
}();