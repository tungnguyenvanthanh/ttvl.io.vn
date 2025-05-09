export let Ckeditor = function () {
	let editorInstance;

	const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDc5NTgzOTksImp0aSI6IjlhYTIzOGQ5LTVmZTgtNGRiNS1iZTQ2LWU5MDU1ZmQ5N2Q3YiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImFjYjc4MGYzIn0.r1HikNOx5SoDUmvMKh4zQdmPHZdmjc5fgbU5FFSgl8eX8AjfN8rf9NzLBeK-P8c6X-EZTB15nTe1RLugMxio7A';

	const preload = async () => {
		if (window.__ckeditor_loaderPromise) return window.__ckeditor_loaderPromise;

		window.__ckeditor_loaderPromise = (async () => {
			await loadAsset({ type: "css", url: "_content/MudThemeLibrary/plugins/ckeditor5/ckeditor5.css", location: "before" });
		})();

		return window.__ckeditor_loaderPromise;
	};

	const init = async (dotNetHelper, editorElement, wordCountElement) => {
		if (!editorElement) {
			console.warn(`[CKEditor] Element with not found.`);
			return;
		}

		if (editorInstance) {
			await editorInstance.destroy();
			editorInstance = null;
		}

		const { ClassicEditor, Alignment, Autoformat, AutoImage, AutoLink, Autosave,
			BalloonToolbar, BlockQuote, BlockToolbar, Bold, Bookmark, Code,
			CodeBlock, Emoji, Essentials, FindAndReplace, FontBackgroundColor, FontColor,
			FontFamily, FontSize, FullPage, Fullscreen, GeneralHtmlSupport, Heading,
			Highlight, HorizontalLine, HtmlComment, HtmlEmbed, ImageBlock, ImageCaption,
			ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle,
			ImageTextAlternative, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic,
			Link, LinkImage, List, ListProperties, MediaEmbed, Mention, PageBreak,
			Paragraph, PasteFromMarkdownExperimental, PasteFromOffice, PlainTableOutput,
			RemoveFormat, ShowBlocks, SimpleUploadAdapter, SourceEditing, SpecialCharacters,
			SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials,
			SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText,
			Strikethrough, Subscript, Superscript, Table, TableCaption, TableCellProperties,
			TableColumnResize, TableLayout, TableProperties, TableToolbar, TextTransformation,
			TodoList, Underline, WordCount } = await import('/_content/MudThemeLibrary/plugins/ckeditor5/ckeditor5.js');
		const translations = await import('/_content/MudThemeLibrary/plugins/ckeditor5/translations/vi.js');

		const editorConfig = {
			toolbar: {
				items: [
					'sourceEditing', 'showBlocks', 'findAndReplace', 'fullscreen', '|',
					'heading', '|', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
					'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
					'code', 'removeFormat', '|', 'emoji', 'specialCharacters', 'horizontalLine',
					'pageBreak', 'link', 'bookmark', 'insertImage', 'insertImageViaUrl',
					'mediaEmbed', 'insertTable', 'insertTableLayout', 'highlight', 'blockQuote',
					'codeBlock', 'htmlEmbed', '|', 'alignment', '|', 'bulletedList',
					'numberedList', 'todoList', 'outdent', 'indent'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				Alignment, Autoformat, AutoImage, AutoLink, Autosave, BalloonToolbar, BlockQuote,
				BlockToolbar, Bold, Bookmark, Code, CodeBlock, Emoji, Essentials, FindAndReplace,
				FontBackgroundColor, FontColor, FontFamily, FontSize, FullPage, Fullscreen,
				GeneralHtmlSupport, Heading, Highlight, HorizontalLine, HtmlComment, HtmlEmbed,
				ImageBlock, ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize,
				ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload, Indent, IndentBlock,
				Italic, Link, LinkImage, List, ListProperties, MediaEmbed, Mention, PageBreak,
				Paragraph, PasteFromMarkdownExperimental, PasteFromOffice, PlainTableOutput,
				RemoveFormat, ShowBlocks, SimpleUploadAdapter, SourceEditing, SpecialCharacters,
				SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials,
				SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText,
				Strikethrough, Subscript, Superscript, Table, TableCaption, TableCellProperties,
				TableColumnResize, TableLayout, TableProperties, TableToolbar, TextTransformation,
				TodoList, Underline, WordCount
			],
			balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
			blockToolbar: [
				'fontSize', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', '|',
				'link', 'insertImage', 'insertTable', 'insertTableLayout', '|',
				'bulletedList', 'numberedList', 'outdent', 'indent'
			],
			fontFamily: { supportAllValues: true },
			fontSize: { options: [10, 12, 14, 'default', 18, 20, 22], supportAllValues: true },
			fullscreen: { onEnterCallback: container => container.classList.add('editor-container', 'main-container') },
			heading: { options: Array.from({ length: 6 }, (_, i) => ({ model: `heading${i + 1}`, view: `h${i + 1}`, title: `Heading ${i + 1}`, class: `ck-heading_heading${i + 1}` })) },
			htmlSupport: { allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }] },
			image: { toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage'] },
			initialData: '',
			language: 'vi',
			licenseKey: LICENSE_KEY,
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: { toggleDownloadable: { mode: 'manual', label: 'Downloadable', attributes: { download: 'file' } } }
			},
			list: { properties: { styles: true, startIndex: true, reversed: true } },
			mention: { feeds: [{ marker: '@', feed: [] }] },
			menuBar: { isVisible: true },
			placeholder: 'Type or paste your content here!',
			table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'] },
			translations: [translations.default]
		};

		ClassicEditor.create(editorElement, editorConfig)
			.then(editor => {
				const wordCount = editor.plugins.get('WordCount');
				wordCountElement.appendChild(wordCount.wordCountContainer);

				editorInstance = editor;
				editor.model.document.on('change:data', () => {
					dotNetHelper.invokeMethodAsync("OnEditorContentChanged", editor.getData());
				});
			})
			.catch(error => {
				console.error('CKEditor init failed', error);
			});
	};

	const getEditorContent = async () => {
		return editorInstance ? editorInstance.getData() : '';
	};

	const setEditorContent = async (content) => {
		if (editorInstance) {
			editorInstance.setData(content);
		}
	};

	const renderPreview = async (content, iframeElement, cssUrls) => {
		if (!iframeElement) return;

		const doc = iframeElement.contentDocument || iframeElement.contentWindow.document;
		doc.open();

		const links = cssUrls.map(url => `<link rel="stylesheet" href="${url}">`).join("\n");

		doc.write(`
			<html>
				<head>
					${links}
					<style>body{padding: 15px;}</style>
				</head>
				<body>
					${content}
				</body>
			</html>
		`);
		doc.close();
	};

	return {
		preload,
		init,
		getEditorContent,
		setEditorContent,
		renderPreview
	};
}();