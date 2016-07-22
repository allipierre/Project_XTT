/**
 * APEX Client Extension Browser
 *
 * Creates the apexce.fs object and methods.
 * Provides access to the client filesystem, with functions to browse directories,
 * read and write files, and so on.
 * Loaded by preload.js.
 *
 * @summary   webFrame methods.
 *
 * @namespace apexce.fs
 *
 **/

const { ipcRenderer } = require('electron');

exports.readDirSync = function(path,options) {
  var vResult = ipcRenderer.sendSync('fs.readDirSync', path, options);

  if (!vResult.success) {
    console.log(vResult);
    return false;
  } else {
    return vResult.data;
  }
};

exports.readFileSync = function(file,options) {
  if (options===undefined) {
    options = { "encoding" : "utf8" };
  } else {
    if (options.encoding===undefined) {
      options.encoding = "utf8";
    }
  }

  var vResult = ipcRenderer.sendSync('fs.readFileSync', file, options);

  if (!vResult.success) {
    console.log(vResult);
    return false;
  } else {
    return vResult.data;
  }
};

