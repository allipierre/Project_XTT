var fs = require('fs');
var configFile = 'config.json';
var config = {
    "configName": "Default Configuration File",
    "appTitle": "APEX Client Extension",
    "startURL": "https://apex.oracle.com/pls/apex/f?p=APEXCE",
    "urlBlackList": [],
    "exposeClipboard": true,
    "exposeDialog": true,
    "exposeFs": true,
    "exposeGlobalShortcut": false,
    "exposeIpcRenderer": true,
    "exposeMenu": false,
    "exposeNativeImage": false,
    "exposePrint": true,
    "exposeProcessInfo": true,
    "exposeShell": true,
    "exposeWebFrame": true,
    "allowDevTools": true,
    "openDevToolsRenderer": false,
    "openDevToolsWebview": false
};

fs.access(configFile, fs.F_OK, function(err) {
    err && fs.writeFile(configFile, JSON.stringify(config, null, 4), {
        flag: 'wx'
    }, function(err) {
        if (err) return console.log(err);
    });
});
