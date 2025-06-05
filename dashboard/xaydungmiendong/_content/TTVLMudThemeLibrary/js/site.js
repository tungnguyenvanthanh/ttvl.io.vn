window.TTVLMudThemeLibrary = function () {
    let initScrollEvent = (dotNetHelper) => {
        window.onscroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                dotNetHelper.invokeMethodAsync('ScrollLoadMore');
            }
        };
    };

    let copyText = (element, dotNetHelper) => {
        navigator.clipboard.writeText(element.innerText)
            .then(() => {
                dotNetHelper.invokeMethodAsync('OnCopyText', element.innerText);
            })
            .catch(err => console.error("Failed to copy text:", err));
    };

    let beautifyHtml = async (html) => {
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

    return {
        initScrollEvent,
        copyText,
        beautifyHtml
    };
}();