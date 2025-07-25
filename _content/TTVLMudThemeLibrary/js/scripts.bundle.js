const assetsToLoad = [
    { type: "css", url: "_content/TTVLMudThemeLibrary/css/app.css", location: "before" },

    { type: "js", url: "_content/MudBlazor/MudBlazor.min.js", location: "head" },

    { type: "js", url: "_content/MudBlazor.Markdown/MudBlazor.Markdown.min.js", location: "head" },
    { type: "css", url: "_content/MudBlazor.Markdown/MudBlazor.Markdown.min.css", location: "before" },

    { type: "css", url: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap", location: "before" },
    { type: "css", url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined", location: "before" },
    { type: "css", url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded", location: "before" },
    { type: "css", url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp", location: "before" },

    { type: "css", url: "_content/MudBlazor.FontIcons.MaterialSymbols/css/font.min.css", location: "before" },
    { type: "css", url: "https://use.fontawesome.com/releases/v5.14.0/css/all.css", location: "before" },

    { type: "js", url: "_content/TTVLMudThemeLibrary/js/jquery/jquery-3.7.1.js", location: "head" },
    { type: "js", url: "_content/CurrieTechnologies.Razor.SweetAlert2/sweetAlert2.min.js", location: "body" },
    { type: "js", url: "_content/TTVLMudThemeLibrary/js/jquery/jquery-ui.js", location: "head" },
    { type: "js", url: "_content/TTVLMudThemeLibrary/js/jquery/jquery.ui.touch-punch.min.js", location: "head" },
    //{ type: "js", url: "_content/TTVLMudThemeLibrary/plugins/beautify/beautify-html.min.js", location: "body" },
    { type: "js", url: "_content/TTVLMudThemeLibrary/js/site.js", location: "body" },
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