'use strict';
/**
 * This is the main entry point for the APEX Client Extension Browser.
 *
 * It is called when starting up Electron and is the Main (or Background) Process.
 * In here we handle all Windows and also the access to the clients ressources.
 *
 * @summary   Electron Main process.
 *
 */

 // global base path for main process
 const path = require('path');
 global.__base = path.normalize(__dirname + '/../');

// get app configuration settings
const config = require(__base + 'common/config.js');

// grab some modules
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

if (config.exposeFs()) var fs = require('fs');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const mainIdx   = 0;
var   windowMgr = [];

// initialize application menu
require(__base + 'background/application-menu.js');


// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // We ignore the common OS X behavior and quit the app when the last window
  // was closed
  //if (process.platform != 'darwin') {
    app.quit();
  //}
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  // Create the browser window.
  windowMgr[mainIdx] = new BrowserWindow({
    "width": 1280, // init width
    "height": 800, // init height
    "resizable": true,
    "useContentSize": true,
    "title": config.appTitle()
  });

  // and load the index.html of the app.
  windowMgr[mainIdx].loadURL('file://' + __base + 'foreground/index.html');

  // Open the DevTools
  if (config.openDevToolsRenderer()) windowMgr[mainIdx].webContents.openDevTools({mode:"bottom"});

  // Load start URL
  windowMgr[mainIdx].webContents.on('did-finish-load', function() {
    windowMgr[mainIdx].webContents.send('loadURL', config.startURL());
    windowMgr[mainIdx].webContents.send('setWindowMgrId',mainIdx);
  });

  // Emitted when the window is closed.
  windowMgr[mainIdx].on('closed', function() {
    // Dereference the window object
    windowMgr[mainIdx] = null;
  });

});



// -----------------------------------------------------------------------------
var gCommandId = 0;

// listening for a command from renderer/webview
ipcMain.on('runCommand', (event, arg) => {
  console.log('runCommand',arg);
  if (arg) {
    gCommandId++;
    exec(arg,function(error,stdout,stderr) {
      console.log(stdout);
      console.log('sending runCommandOutput_'+gCommandId);
      event.sender.send('runCommandOutput_'+gCommandId,error,stdout,stderr);
    });
    event.returnValue = gCommandId;

  } else {
    event.returnValue = 'empty command string received';
  }
});


// -----------------------------------------------------------------------------
//   Window Manager Functions
//   ------------------------
//
//   We had to create our own Window Manager to support window.opener relations
//   between windows, since this is a common pattern in APEX applications.
//   e.g. APEX Popup LOV is a Window which wants to write back to the opener
// -----------------------------------------------------------------------------


// open new window with a webview
ipcMain.on('windowMgrOpen', function(event, pUrl, pFrameName, pOptions, pParentId){

  // grab new index in our window array
  var vIdx = windowMgr.length;

  // create window
  windowMgr[vIdx] = new BrowserWindow({
    "width": 800, // init width
    "height": 600, // init height
    "resizable": true,
    "useContentSize": true,
    "title": config.appTitle()
  });

  // and load the index.html of the app.
  windowMgr[vIdx].loadURL('file://' + __base + 'foreground/index.html');

  // once the webcontents (and the webview) is set up we trigger the load of the
  // actual page and also set the parent-id, which in turn creates window.opener
  windowMgr[vIdx].webContents.on('did-finish-load', function() {
    windowMgr[vIdx].webContents.send('loadURL',pUrl);
    windowMgr[vIdx].webContents.send('setParentWindowMgrId',vIdx,pParentId);
  });

  // show the developer tools
  if (config.openDevToolsRenderer()) windowMgr[vIdx].webContents.openDevTools({mode:"bottom"});

  // Emitted when the window is closed.
  windowMgr[vIdx].on('closed', function() {
    // Dereference the window object
    windowMgr[vIdx] = null;
  });

  // return the windowMgr Idx to the caller, in case they need it
  event.returnValue = vIdx;
});


// close the given window
ipcMain.on('windowMgrClose', function(event, pWindowId){

  if (windowMgr[pWindowId]) {
    windowMgr[pWindowId].close();
  }
});

// focus the given window
ipcMain.on('windowMgrFocus', function(event, pWindowId){

  if (windowMgr[pWindowId]) {
    windowMgr[pWindowId].focus();
  }
});

// set a value to an item in a specified window
ipcMain.on('windowMgr$s', function(event,pWindowMgrId,pNd,pValue,pDisplayValue,pSuppressChangeEvent) {
  if (windowMgr[pWindowMgrId]) {
    windowMgr[pWindowMgrId].webContents.send('renderer$s',pNd,pValue,pDisplayValue,pSuppressChangeEvent);
  }
  // caller is waiting for just any answer
  event.returnValue = '';
});


// -----------------------------------------------------------------------------
//   File System Functions
//   ----------------------
//
//   Implements various fs methods to browse directories and read/write files.
// -----------------------------------------------------------------------------

// read a directory
ipcMain.on('fs.readDirSync', (event, path, options) => {
  if (path) {
    try {
      event.returnValue = {"success":true, "data": fs.readdirSync(path,options)};
    }
    catch (err) {
      console.log(err);
      event.returnValue = {"success":false, "error": err, "message": err.message, "name":err.name};
    }

  } else {
    event.returnValue = 'empty path received';
  }
});

// read a file
ipcMain.on('fs.readFileSync', (event, file, options) => {
  if (file) {
    try {
      event.returnValue = {"success":true, "data": fs.readFileSync(file, options)};
    }
    catch (err) {
      console.log(err);
      event.returnValue = {"success":false, "error": err, "message": err.message, "name":err.name};
    }

  } else {
    event.returnValue = 'empty filename received';
  }
});
