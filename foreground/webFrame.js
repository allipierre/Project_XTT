/**
 * APEX Client Extension Browser
 *
 * Creates the apexce.webFrame object and methods.
 * It hides the original electron webFrame for security reasons, because that is
 * and EventEmitter class which can lead to full Node access.
 * Loaded by preload.js.
 *
 * @summary   webFrame methods.
 *
 * @namespace apexce.webFrame
 *
 **/

const { webFrame } = require('electron');

exports.setZoomFactor = function(factor) {
  webFrame.setZoomFactor(factor);
};

exports.getZoomFactor = function() {
  return webFrame.getZoomFactor();
};

exports.setZoomLevel = function(level) {
  webFrame.setZoomLevel(level);
};

exports.getZoomLevel = function() {
  return webFrame.getZoomLevel();
};

exports.setZoomLevelLimits = function(minimumLevel, maximumLevel) {
  webFrame.setZoomLevelLimits(minimumLevel, maximumLevel);
};

exports.setSpellCheckProvider = function(language, autoCorrectWord, provider) {
  webFrame.setSpellCheckProvider(language, autoCorrectWord, provider);
};

/*
   don't provide those functions, they seem to impose a big security risk

exports.registerURLSchemeAsSecure = function(scheme) {
  webFrame.registerURLSchemeAsSecure(scheme);
};

exports.registerURLSchemeAsBypassingCSP = function(scheme) {
  webFrame.registerURLSchemeAsBypassingCSP(scheme);
};

exports.registerURLSchemeAsPrivileged = function(scheme) {
  webFrame.registerURLSchemeAsPrivileged(scheme);
};
*/

exports.insertText = function(text) {
  webFrame.insertText(text);
};

exports.getResourceUsage = function(code,userGesture) {
  return webFrame.getResourceUsage(code,userGesture);
};
