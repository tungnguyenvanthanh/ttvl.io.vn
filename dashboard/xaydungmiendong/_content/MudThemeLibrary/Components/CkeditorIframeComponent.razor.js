export let Ckeditor = function () {
	let dotNetRefGlobal = null;

	const init = async (dotNetHelper, editorIframeRef, htmlContent) => {

		dotNetRefGlobal = dotNetHelper;

		// Lắng nghe sự kiện từ iframe
		window.addEventListener("message", (event) => {
			if (event.data?.type === 'editor-ready') {
				if (editorIframeRef.contentWindow) {
					editorIframeRef.contentWindow.postMessage({
						type: 'init-editor'
					}, '*');

					editorIframeRef.contentWindow.postMessage({
						type: 'set-content',
						data: {
							html: htmlContent
						}
					}, '*');
				}
			}

			if (event.data?.type === 'editor-data') {
				if (window.Blazor && window.Blazor.platform && dotNetRefGlobal) {
                    try {
						dotNetRefGlobal.invokeMethodAsync('OnEditorContentChanged', event.data.data);
					} catch (err) {
						console.warn("OnEditorContentChanged: ", err);
                    }
				}
			}

			if (event.data?.type === 'full-screen-toggle') {
				if (window.Blazor && window.Blazor.platform && dotNetRefGlobal) {
					try {
						dotNetRefGlobal.invokeMethodAsync("OnCkeditorFullscreenChanged", event.data.data);
					} catch (err) {
						console.warn("OnCkeditorFullscreenChanged: ", err);
					}
				}
			}
		});
	};

	const setEditorContent = async (htmlContent, editorIframeRef) => {
		if (editorIframeRef.contentWindow) {
			editorIframeRef.contentWindow.postMessage({
				type: 'set-content',
				data: {
					html: htmlContent
				}
			}, '*');
		}
	};

	const renderPreview = async (htmlContent, iframePreviewRef, cssUrls) => {
		if (!iframePreviewRef) return;

		const doc = iframePreviewRef.contentDocument || iframePreviewRef.contentWindow.document;
		doc.open();

		const links = cssUrls.map(url => `<link rel="stylesheet" href="${url}">`).join("\n");

		doc.write(`
			<html>
				<head>
					${links}
					<style>body{padding: 15px;}</style>
				</head>
				<body>
					${htmlContent}
				</body>
			</html>
		`);
		doc.close();
	};

	const dispose = () => {
		dotNetRefGlobal = null;
	}

	return {
		init,
		setEditorContent,
		renderPreview,
		dispose
	};
}();
