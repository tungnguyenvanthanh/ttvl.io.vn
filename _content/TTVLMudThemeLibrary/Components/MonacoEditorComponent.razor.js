window.MonacoInterop = {
    editors: {},

    initializeMonaco: function (divId, value, language, theme, dotNetHelper) {
        if (typeof require === 'undefined') {
            console.error('⚠️ Monaco loader.js chưa được tải.');
            return;
        }

        require.config({
            paths: {
                vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs'
            }
        });

        self.MonacoEnvironment = {
            baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/'
        };

        require(['vs/editor/editor.main'], function () {
            const editor = monaco.editor.create(document.getElementById(divId), {
                value: value,
                language: language,
                theme: theme,
                automaticLayout: true
            });

            editor.onDidChangeModelContent(() => {
                const content = editor.getValue();
                dotNetHelper.invokeMethodAsync('OnContentChanged', content);
            });

            MonacoInterop.editors[divId] = editor;
        });
    },

    disposeMonaco: function (divId) {
        if (MonacoInterop.editors[divId]) {
            MonacoInterop.editors[divId].dispose();
            delete MonacoInterop.editors[divId];
        }
    }
};
