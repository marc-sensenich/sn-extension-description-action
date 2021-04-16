let generateExtensionDescription = function ({
    identifier,
    name,
    contentType,
    area,
    version,
    description,
    url,
    downloadUrl,
    latestUrl,
    marketingUrl,
    thumbnailUrl,
    dockIconBackgroundColor,
    dockIconForegroundColor,
    dockIconBorderColor,
}) {
    let extensionDescription = {
        identifier: identifier,
        name: name,
        content_type: contentType,
        area: area,
        version: version,
        description: description,
        url: url,
        download_url: downloadUrl,
    };

    if (latestUrl) {
        extensionDescription['latest_url'] = latestUrl;
    }

    if (marketingUrl) {
        extensionDescription['marketing_url'] = marketingUrl;
    }

    if (thumbnailUrl) {
        extensionDescription['thumbnail_url'] = thumbnailUrl;
    }

    if (area == 'themes') {
        let dockIcon = {};

        if (dockIconBackgroundColor) {
            dockIcon['dock_icon_background_color'] = dockIconBackgroundColor;
        }

        if (dockIconForegroundColor) {
            dockIcon['dock_icon_foreground_color'] = dockIconForegroundColor;
        }

        if (dockIconBorderColor) {
            dockIcon['dock_icon_border_color'] = dockIconBorderColor;
        }

        if (Object.keys(dockIcon).length > 0) {
            dockIcon['dock_icon_type'] = 'circle';
            extensionDescription['dock_icon'] = dockIcon;
        }
    }

    return extensionDescription;
}

module.exports = generateExtensionDescription;
