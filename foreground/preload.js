//
// This module is loaded as "preload" in an Electron Webview and thus injects
// some Electron modules into the loaded Website (=APEX Page)
//

//
// Main namespace for the Rich APEX Browser.
//
window.rab = window.rab || {};

window.rab.isActive = function () {
  return true;
}

//
// load config settings to see which modules should be activated
//
const config = require('../common/config.js');

const {ipcRenderer} = require('electron');

//
// do some filtering based on the loaded page
// -> blacklist can define pages/urls where we won't inject anything
//
if (!config.isActiveForUrl(window.location)) return;


// Helper function to resolve relative url.
var vAhelper = window.top.document.createElement('a')
var resolveURL = function (url) {
  vAhelper.href = url
  return vAhelper.href
}

// Window object returned by "window.open".
var WindowOpenerProxy = (function () {
  WindowOpenerProxy.proxies = {}

  WindowOpenerProxy.getOrCreate = function (windowMgrId) {
    var base = this.proxies
    base[windowMgrId] != null ? base[windowMgrId] : base[windowMgrId] = new WindowOpenerProxy(windowMgrId)
    return base[windowMgrId]
  }

  WindowOpenerProxy.remove = function (windowMgrId) {
    return delete this.proxies[windowMgrId]
  }

  function WindowOpenerProxy (windowMgrId1) {
    Object.defineProperty(this, 'windowMgrId', {
      configurable: false,
      enumerable: true,
      writeable: false,
      value: windowMgrId1
    })

    this.closed = false
  }

  WindowOpenerProxy.prototype.close = function () {
    return ipcRenderer.send('windowMgrClose', this.windowMgrId)
  }

  return WindowOpenerProxy
})()

// initialize our internal window-id
window.windowMgrId = null;

// create a new BrowserWindow with a Webview and load the given URL
window.open = function (url, frameName, features) {

  var feature, i, j, len, len1, name, options, ref1, ref2, value
  if (frameName == null) {
    frameName = ''
  }
  if (features == null) {
    features = ''
  }
  options = {}

  const ints = ['x', 'y', 'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'zoomFactor']
  const webPreferences = ['zoomFactor', 'nodeIntegration', 'preload']
  const disposition = 'new-window'

  // Make sure to get rid of excessive whitespace in the property name
  ref1 = features.split(/,\s*/)
  for (i = 0, len = ref1.length; i < len; i++) {
    feature = ref1[i]
    ref2 = feature.split(/\s*=/)
    name = ref2[0]
    value = ref2[1]
    value = value === 'yes' || value === '1' ? true : value === 'no' || value === '0' ? false : value
    if (webPreferences.includes(name)) {
      if (options.webPreferences == null) {
        options.webPreferences = {}
      }
      options.webPreferences[name] = value
    } else {
      options[name] = value
    }
  }
  if (options.left) {
    if (options.x == null) {
      options.x = options.left
    }
  }
  if (options.top) {
    if (options.y == null) {
      options.y = options.top
    }
  }
  if (options.title == null) {
    options.title = frameName
  }
  if (options.width == null) {
    options.width = 800
  }
  if (options.height == null) {
    options.height = 600
  }

  // Resolve relative urls.
  url = resolveURL(url)
  for (j = 0, len1 = ints.length; j < len1; j++) {
    name = ints[j]
    if (options[name] != null) {
      options[name] = parseInt(options[name], 10)
    }
  }

  var vWindowId = ipcRenderer.sendSync("windowMgrOpen",url,frameName,"resizable,scrollbars,status", window.windowMgrId);

  if (vWindowId) {
    return { 'opener': WindowOpenerProxy.getOrCreate(vWindowId), 'focus': function(){} };
  } else {
    return null
  }
}

// close that BrowserWindow
window.close = function () {
  ipcRenderer.send("windowMgrClose",window.windowMgrId);
}

// called from main->renderer to initialize the window.opener object of a Popup
// 0 is the main-window, every other window is decendant from that or another window
window.initOpener = function(pWindowMgrId,pParentWindowMgrId) {
  // create a fake opener object since electron can't handle regular "opener"
  // because of it's distributed processes (each window/webview runs in a separated process)
  window.windowMgrId        = pWindowMgrId;
  window.opener             = {};
  window.opener.windowMgrId = pParentWindowMgrId;
  window.opener.$x          = function(pNd) {
    return pNd;
  }
  window.opener.$s       = function(pNd,pValue,pDisplayValue,pSuppressChangeEvent) {
    console.log('window.opener.$s',opener.windowMgrId,pNd,pValue);

    if (parseInt(opener.windowMgrId) >= 0)
      return ipcRenderer.sendSync("windowMgr$s",opener.windowMgrId,pNd,pValue,pDisplayValue,pSuppressChangeEvent);
    else
      return null;
  }
}



//
// Add Electron Process extension
//
if (config.exposeProcessInfo())    window.rab.process        = global.process;

//
// Add Renderer Process Electron API's
//
if (config.exposeClipboard())      window.rab.clipboard      = require('electron').clipboard;
if (config.exposeIpcRenderer())    window.rab.ipcRenderer    = ipcRenderer;
if (config.exposeNativeImage())    window.rab.nativeImage    = require('electron').nativeImage;
if (config.exposeShell())          window.rab.shell          = require('electron').shell;
if (config.exposeWebFrame())       window.rab.webFrame       = require('electron').webFrame;

//
// Add selected Main Process Electron API's
//
if (config.exposeDialog())         window.rab.dialog         = require('electron').remote.dialog;
if (config.exposeGlobalShortcut()) window.rab.globalShortcut = require('electron').remote.globalShortcut;
if (config.exposeMenu())           window.rab.Menu           = require('electron').remote.Menu;
if (config.exposeMenu())           window.rab.MenuItem       = require('electron').remote.MenuItem;
