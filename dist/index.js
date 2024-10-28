require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 760:
/***/ ((module) => {

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
            dockIcon['background_color'] = dockIconBackgroundColor;
        }

        if (dockIconForegroundColor) {
            dockIcon['foreground_color'] = dockIconForegroundColor;
        }

        if (dockIconBorderColor) {
            dockIcon['border_color'] = dockIconBorderColor;
        }

        if (Object.keys(dockIcon).length > 0) {
            dockIcon['type'] = 'circle';
            extensionDescription['dock_icon'] = dockIcon;
        }
    }

    return extensionDescription;
}

module.exports = generateExtensionDescription;


/***/ }),

/***/ 695:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 918:
/***/ ((module) => {

module.exports = eval("require")("@actions/io");


/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(695);
const io = __nccwpck_require__(918);
const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);
const generateExtensionDescription = __nccwpck_require__(760);


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

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map