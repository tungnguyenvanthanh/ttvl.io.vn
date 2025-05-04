const assetsToLoad = [
    { type: "css", url: "_content/MudThemeLibrary/css/app.css?ttvl-version=1", location: "before" },
    { type: "js", url: "_content/MudBlazor/MudBlazor.min.js?ttvl-version=1", location: "head" },
    { type: "js", url: "_content/MudBlazor.Markdown/MudBlazor.Markdown.min.js?ttvl-version=1", location: "head" },
    { type: "js", url: "_content/MudThemeLibrary/js/site.js?ttvl-version=1", location: "body" },
    { type: "css", url: "_content/MudBlazor/MudBlazor.min.css?ttvl-version=1", location: "before" },
    { type: "css", url: "_content/MudBlazor.Markdown/MudBlazor.Markdown.min.css?ttvl-version=1", location: "before" },
    { type: "css", url: "_content/MudThemeLibrary/css/spacing.css?ttvl-version=1", location: "before" },
    { type: "css", url: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap", location: "before" },
    { type: "css", url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined", location: "before" },
    { type: "css", url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded", location: "before" },
    { type: "css", url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp", location: "before" },
    { type: "css", url: "_content/MudBlazor.FontIcons.MaterialSymbols/css/font.min.css?ttvl-version=1", location: "before" },
    { type: "css", url: "https://use.fontawesome.com/releases/v5.14.0/css/all.css", location: "before" },
    { type: "js", url: "_content/MudThemeLibrary/js/jquery/jquery-3.7.1.js", location: "head" },
    { type: "js", url: "_content/CurrieTechnologies.Razor.SweetAlert2/sweetAlert2.min.js?ttvl-version=1", location: "body" },
    { type: "js", url: "_content/MudThemeLibrary/js/jquery/jquery-ui.js", location: "head" },
    { type: "js", url: "_content/MudThemeLibrary/js/jquery/jquery.ui.touch-punch.min.js", location: "head" },
];

async function loadAsset(asset) {
    return new Promise((resolve, reject) => {
        if (asset.type === "js") {
            const script = document.createElement("script");
            script.src = asset.url;
            script.async = false;
            script.onload = () => resolve(asset.url);
            script.onerror = () => reject(new Error(`Failed to load ${asset.url}`));
            (asset.location === "head" ? document.head : document.body).appendChild(script);
        } else if (asset.type === "css") {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = asset.url;
            link.onload = () => resolve(asset.url);
            link.onerror = () => reject(new Error(`Failed to load ${asset.url}`));
            if (asset.location === "before") {
                document.head.insertBefore(link, document.head.firstChild);
            } else {
                document.head.appendChild(link);
            }
        }
    });
}

// Đảm bảo chỉ gọi Blazor.start() một lần
async function loadAllAssets() {
    for (let asset of assetsToLoad) {
        await loadAsset(asset);
        console.log(`${asset.url} loaded`);
    }
    console.log("All assets loaded...");
}

// Chờ tài nguyên được tải xong rồi mới khởi động Blazor
window.onload = loadAllAssets;