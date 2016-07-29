/**
 * APEX Client Extension Browser
 *
 * Creates the apexce.print object and methods.
 * Provides several printing methods.
 * Loaded by preload.js.
 *
 * @summary   print methods.
 *
 * @namespace apexce.print
 *
 **/

const { ipcRenderer } = require('electron');
const { dialog }      = require('electron').remote;



exports.printPage = function(options) {
  options=options||{};
  apexce.ipcRenderer.sendToHost("printPage",options);
};

exports.printToPDF = function(options,filename) {
  options=options||{};

  if ((filename===undefined)||(filename.length===0)) {
    filename = apexce.dialog.showSaveDialog({"title":"Save Page as PDF","filters":[{"name":"PDF","extensions":["pdf"]}]});
  }

  apexce.ipcRenderer.sendToHost("printToPDF",options,filename);

  return filename;
};

