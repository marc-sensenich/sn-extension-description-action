const core = require('@actions/core');
const io = require('@actions/io');
const fs = require('fs');
const path = require('path');
const generateExtensionDescription = require('./generate');


async function run() {
    try {
        // Extension description inputs
        const identifier = core.getInput('identifier', { required: true });
        const name = core.getInput('name', { required: true });
        const contentType = core.getInput('content_type', { required: true });
        const area = core.getInput('area', { required: true });
        const version = core.getInput('version', { required: true });
        const description = core.getInput('description', { required: true });
        const url = core.getInput('url', { required: true });
        const downloadUrl = core.getInput('download_url', { required: true });
        const latestUrl = core.getInput('latest_url');
        const marketingUrl = core.getInput('marketing_url');
        const thumbnailUrl = core.getInput('thumbnail_url');
        const dockIconBackgroundColor = core.getInput('dock_icon_background_color');
        const dockIconForegroundColor = core.getInput('dock_icon_foreground_color');
        const dockIconBorderColor = core.getInput('dock_icon_border_color');

        // Ouput file inputs
        const outputPath = core.getInput('output_path');

        const extensionDescription = generateExtensionDescription({
            identifier: identifier,
            name: name,
            contentType: contentType,
            area: area,
            version: version,
            description: description,
            url: url,
            latestUrl: latestUrl,
            downloadUrl: downloadUrl,
            marketingUrl: marketingUrl,
            thumbnailUrl: thumbnailUrl,
            dockIconBackgroundColor: dockIconBackgroundColor,
            dockIconForegroundColor: dockIconForegroundColor,
            dockIconBorderColor: dockIconBorderColor,
        });

        const extensionDescriptionJSON = JSON.stringify(extensionDescription, null, 2);

        if (outputPath !== '') {
            const outputDirectory = path.dirname(outputPath);
            if (!fs.existsSync(outputDirectory)) {
                io.mkdirP(outputDirectory);
            }
            fs.writeFileSync(outputPath, extensionDescriptionJSON);
        }

        core.setOutput('extension_description', extensionDescriptionJSON);
    } catch (error) {
        console.error(error.message);
        core.setFailed(error.message);
    }
}

run();
