(function(require) { 'use strict'

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------

  // get hold of our webview element
  var webview       = document.getElementsByTagName("webview")[0];

  // used to know whether webview is ready to call its methods
  var gStillLoading = true;

  // communication handles to talk to backend process (main)
  const {ipcRenderer, remote, webFrame } = require('electron');

  // functional modules, e.g. shell access
  const {exec} = require('child_process');

  // get general settings of this app
  const config = require('../common/config.js');


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

    if (event.channel === "runCommand") {
      if (event.args) {
        console.log(event.args);
        exec(event.args,function(error,stdout,stderr) {console.log(stdout);});
        event.returnValue = "Renderer-OK";
      } else {
        event.returnValue = 'Renderer-empty command string received';
      }
    } else if (event.channel === "loadURL") {
      console.log('webview-loadURL',event.args[0]);
      webview.loadURL(event.args[0]);
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
