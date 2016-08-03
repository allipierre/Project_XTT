/**
 * APEX Client Extension Browser
 *
 * This code gets executed by the Electron Renderer process. It is responsible
 * for setting up and communicating to the Webview.
 * The Renderer itself has no other visual elements than the Webview.
 *
 * @summary   Electron Renderer process.
 *
 */

 // global base path for renderer process
 const path = require('path');
 global.__base = path.normalize(__dirname + '/../');

(function(require) { 'use strict'

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------

  // get hold of our webview element
  var webview       = document.getElementsByTagName("webview")[0];

  // used to know whether webview is ready to call its methods
  var gStillLoading = true;

  // communication handles to talk to backend process (main)
  const { ipcRenderer, remote, webFrame } = require('electron');
  const { dialog } = remote;

  // functional modules, e.g. shell access
  const { exec } = require('child_process');
  const fs = require('fs');

  // get general settings of this app
  const config = require(__base + 'common/config.js');


  // ---------------------------------------------------------------------------
  // initializing webview and webview event listeners
  // ---------------------------------------------------------------------------

  // open href links in electron app
  webview.addEventListener('new-window', function(e) {
    //ipcRenderer.sendSync("windowMgrOpen",e.url,e.frameName,"resizable,scrollbars,status",window.opener.windowMgrId);
    webview.executeJavaScript('window.open("'+e.url+'","'+e.frameName+'","resizable,scrollbars,status");');
  });

  // log console messages from the webview to the renderer browser console
  // otherwise they can never be seen
  if (config.openDevToolsRenderer && !config.openDevToolsWebview()) {
    webview.addEventListener('console-message', function(e) {
      console.log('Webview console.log:', e.message);
    });
  }

  // update window title with current page title
  webview.addEventListener('page-title-updated', function(e) {
    remote.getCurrentWindow().setTitle(e.title);
  });

  // listen for ipc-messages coming from the webview
  webview.addEventListener('ipc-message', function(event) {
    console.log(event);

    if (event.channel === "loadURL") {

      webview.loadURL(event.args[0]);

    } else if (event.channel === "printPage") {

      webview.print(event.args[0]);

    } else if (event.channel === "printToPDF") {

      // create the PDF
      webview.printToPDF(event.args[0],function(err,data){
        if (err) {
          dialog.showErrorBox('Error at printToPDF', err.message);
          return;
        }
        // write the PDF to disk
        fs.writeFile(event.args[1], data, function(err){
          if (err) {
            dialog.showErrorBox('Error at writeFile', err.message);
            return;
          }
        });
      });
    }
  });

  // Open the DevTools in webview
  webview.addEventListener("dom-ready", function() {
    gStillLoading = false;

    // open the developer tools
    if (config.openDevToolsWebview()) webview.openDevTools();

    // is the window-id still to be set?
    webview.executeJavaScript('window.windowMgrId = '+window.windowMgrId);

    // in case we opened a parent window, we have to establish a "connection"
    if (parseInt(window.parentWindowMgrId) >= 0) {
      webview.executeJavaScript('window.initOpener('+window.windowMgrId+','+window.parentWindowMgrId+')');
    }
  });

  // ---------------------------------------------------------------------------
  // listen for communication from main-process
  // ---------------------------------------------------------------------------

  // redirects webview to given URL
  ipcRenderer.on("loadURL", function(event, pUrl) {
    webview.loadURL(pUrl);
  });

  // reloads webview
  ipcRenderer.on("reload", function(event) {
    webview.loadURL(webview.getURL());
  });

  // toggle devTools in webview
  ipcRenderer.on("toggleDevTools", function(event) {
    if (webview.isDevToolsOpened()) {
      webview.closeDevTools();
    } else {
      webview.openDevTools();
    }

  });

  // set our internal window-id
  ipcRenderer.on("setWindowMgrId", function(event, pWindowMgrId) {
    // store the information in the renderer-window
    window.windowMgrId = pWindowMgrId;

    if (!gStillLoading) {
      // now set the information also in the webview
      webview.executeJavaScript('window.windowMgrId = '+pWindowMgrId);
    }
  });

  // emulate "opener" object
  ipcRenderer.on("setParentWindowMgrId", function(event, pWindowMgrId, pParentWindowMgrId) {
    // store the information in the renderer-window
    window.windowMgrId       = pWindowMgrId;
    window.parentWindowMgrId = pParentWindowMgrId;

    if (!gStillLoading) {
      // now set the information also in the webview
      webview.executeJavaScript('window.initOpener('+pWindowMgrId+','+pParentWindowMgrId+')');
    }
  });

  // run apex $s function
  ipcRenderer.on("renderer$s", function(event,pNd,pValue,pDisplayValue,pSuppressChangeEvent) {
    console.log('renderer$s',event,pNd,pValue);
    webview.executeJavaScript('$s("'+pNd+'","'+pValue+'","'+pDisplayValue+'",'+pSuppressChangeEvent+')');
  });

})(require);
