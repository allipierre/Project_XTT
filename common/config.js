/**
 * APEX Client Extension Browser
 *
 * This module provides some utility functions to determine which options should
 * be enabled, according to the features.json file.
 * Main and Renderer process (and its Webview preload) use those functions and
 * provide only those APIs which should be available.
 *
 * @summary   Config setting utility.
 *
 */

//
// load config settings
//
const configJson = require('../features.json');

exports.isActiveForUrl = function (pUrl) {
  // check configJson.urlBlackList
  return true;
}

exports.startURL = function () {
  return configJson.startURL;
}

exports.exposeClipboard = function () {
  return configJson.exposeClipboard;
}

exports.exposeDialog = function () {
  return configJson.exposeDialog;
}

exports.exposeFs = function () {
  return configJson.exposeFs;
}

exports.exposeGlobalShortcut = function () {
  return configJson.exposeGlobalShortcut;
}

exports.exposeIpcRenderer = function () {
  return configJson.exposeIpcRenderer;
}

exports.exposeMenu = function () {
  return configJson.exposeMenu;
}

exports.exposeNativeImage = function () {
  return configJson.exposeNativeImage;
}

exports.exposeProcessInfo = function () {
  return configJson.exposeProcessInfo;
}

exports.exposeShell = function () {
  return configJson.exposeShell;
}

exports.exposeWebFrame = function () {
  return configJson.exposeWebFrame;
}

exports.allowDevTools = function () {
  return configJson.allowDevTools;
}

exports.openDevToolsRenderer = function () {
  return configJson.openDevToolsRenderer;
}

exports.openDevToolsWebview = function () {
  return configJson.openDevToolsWebview;
}

