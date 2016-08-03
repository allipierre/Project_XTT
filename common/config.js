/**
 * APEX Client Extension Browser
 *
 * This module provides some utility functions to determine which options should
 * be enabled, according to the config.json file.
 * Main and Renderer process (and its Webview preload) use those functions and
 * provide only those APIs which should be available.
 *
 * @summary   Config setting utility.
 *
 */

//
// load config settings
//
var utils = require(__base + 'common/utils.js');
const configJson = require(__base + 'config.json');

//
// JSON file checks
//
// valid json
if (!utils.isValidJson(configJson)) {
    console.log("Your config.json file is not a valid JSON object.");
}
// required json elements
if (typeof configJson.appTitle == "undefined") {
    console.log("Missing appTitle in config.json");
}
if (typeof configJson.startURL == "undefined") {
    console.log("Missing startURL in config.json");
}
if (typeof configJson.exposeClipboard == "undefined") {
    console.log("Missing exposeClipboard in config.json");
}
if (typeof configJson.exposeDialog == "undefined") {
    console.log("Missing exposeDialog in config.json");
}
if (typeof configJson.exposeFs == "undefined") {
    console.log("Missing exposeFs in config.json");
}
if (typeof configJson.exposeGlobalShortcut == "undefined") {
    console.log("Missing exposeGlobalShortcut in config.json");
}
if (typeof configJson.exposeIpcRenderer == "undefined") {
    console.log("Missing exposeIpcRenderer in config.json");
}
if (typeof configJson.exposeMenu == "undefined") {
    console.log("Missing exposeMenu in config.json");
}
if (typeof configJson.exposeNativeImage == "undefined") {
    console.log("Missing exposeNativeImage in config.json");
}
if (typeof configJson.exposePrint == "undefined") {
    console.log("Missing exposePrint in config.json");
}
if (typeof configJson.exposeProcessInfo == "undefined") {
    console.log("Missing exposeProcessInfo in config.json");
}
if (typeof configJson.exposeShell == "undefined") {
    console.log("Missing exposeShell in config.json");
}
if (typeof configJson.exposeWebFrame == "undefined") {
    console.log("Missing exposeWebFrame in config.json");
}
if (typeof configJson.allowDevTools == "undefined") {
    console.log("Missing allowDevTools in config.json");
}
if (typeof configJson.openDevToolsRenderer == "undefined") {
    console.log("Missing openDevToolsRenderer in config.json");
}
if (typeof configJson.openDevToolsWebview == "undefined") {
    console.log("Missing openDevToolsWebview in config.json");
}

// exports
exports.isActiveForUrl = function(pUrl) {
    // check configJson.urlBlackList
    return true;
};

exports.appTitle = function() {
    return configJson.appTitle;
};

exports.startURL = function() {
    return configJson.startURL;
};

exports.logging = function() {
    return configJson.logging;
};

exports.exposeClipboard = function() {
    return configJson.exposeClipboard;
};

exports.exposeDialog = function() {
    return configJson.exposeDialog;
};

exports.exposeFs = function() {
    return configJson.exposeFs;
};

exports.exposeGlobalShortcut = function() {
    return configJson.exposeGlobalShortcut;
};

exports.exposeIpcRenderer = function() {
    return configJson.exposeIpcRenderer;
};

exports.exposeMenu = function() {
    return configJson.exposeMenu;
};

exports.exposeNativeImage = function() {
    return configJson.exposeNativeImage;
};

exports.exposePrint = function() {
    return configJson.exposePrint;
};

exports.exposeProcessInfo = function() {
    return configJson.exposeProcessInfo;
};

exports.exposeShell = function() {
    return configJson.exposeShell;
};

exports.exposeWebFrame = function() {
    return configJson.exposeWebFrame;
};

exports.allowDevTools = function() {
    return configJson.allowDevTools;
};

exports.openDevToolsRenderer = function() {
    return configJson.openDevToolsRenderer;
};

exports.openDevToolsWebview = function() {
    return configJson.openDevToolsWebview;
};
