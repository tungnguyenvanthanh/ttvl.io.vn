export const QuillEditor = function () {
    const init = (editorId, placeholder, valueContent, dotNetHelper) => {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block', 'link'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }]
        ];

        const quill = new Quill(`#${editorId}`, {
            modules: { toolbar: toolbarOptions },
            placeholder: placeholder,
            theme: "snow"
        });

        if (valueContent) {
            quill.root.innerHTML = valueContent;
        }

        quill.on("text-change", function () {
            const html = quill.root.innerHTML;
            dotNetHelper.invokeMethodAsync("OnContentChanged", html);
        });

        // lưu quill vào global để có thể gọi lại
        if (!window._quillEditors) window._quillEditors = {};
        window._quillEditors[editorId] = quill;

        return quill;
    }

    const checkContentText = (editorId) => {
        const quill = window._quillEditors?.[editorId];
        if (!quill) return "";
        return quill.getText().trim();
    }

    const setValueContent = (editorId, valueContent) => {
        const quill = window._quillEditors?.[editorId];
        if (!quill) return;

        quill.root.innerHTML = valueContent;
    }

    return {
        init,
        checkContentText,
        setValueContent
    }
}();