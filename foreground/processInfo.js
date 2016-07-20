/**
 * APEX Client Extension Browser
 *
 * Creates the apexce.processInfo object and methods.
 * Loaded by preload.js.
 *
 * @summary   processInfo methods.
 *
 * @namespace apexce.processInfo
 *
 **/

exports.noAsar                = global.process.noAsar;
exports.type                  = global.process.type;
exports.versions              = {};
exports.versions.electron     = global.process.versions.electron;
exports.versions.chrome       = global.process.versions.chrome;
exports.resourcesPath         = global.process.resourcesPath;
exports.mas                   = global.process.mas;
exports.windowsStore          = global.process.windowsStore;
exports.defaultApp            = global.process.defaultApp;
exports.crash                 = global.process.crash;
exports.hang                  = global.process.hang;
exports.setFdLimit            = global.process.setFdLimit;
exports.getProcessMemoryInfo  = global.process.getProcessMemoryInfo;
exports.getSystemMemoryInfo   = global.process.getSystemMemoryInfo;
