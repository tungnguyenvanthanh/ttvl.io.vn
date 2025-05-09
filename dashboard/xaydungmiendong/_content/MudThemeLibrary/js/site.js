window.MudThemeLibrary = function () {
    let initScrollEvent = (dotNetHelper) => {
        window.onscroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                dotNetHelper.invokeMethodAsync('ScrollLoadMore');
            }
        };
    }

    let copyText = (element, dotNetHelper) => {
        navigator.clipboard.writeText(element.innerText)
            .then(() => {
                dotNetHelper.invokeMethodAsync('OnCopyText', element.innerText);
            })
            .catch(err => console.error("Failed to copy text:", err));
    };

    return {
        initScrollEvent,
        copyText
    };
}();