#config.json

A quick overview of the `config.json` configuration file.

Please be very careful when activating any of those features, as giving your APEX application to client resources always has a security impact.

Therefor deactivate all but those really necessary features.

Here are all the options with their default value

```
{
    "configName": "Default Configuration File",
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
}
```

###configName
Just a dummy option to put a descriptive name in your file, in case you juggle with different files for different setups.

###startURL
The initial Page/App that will be loaded when starting the ACE Browser.

###urlBlacklist
Array of regexp strings on which URLs (APEX Pages/Apps) below features should not be injected to.

###exposeClipboard
Read from and write to the system clipboard.

###exposeDialog
Create OS Dialogs instead of Browser Dialogs (more native look and feel).

###exposeFs
Fs means Filesystem and exposes methods to browse directories and read/write files.

###exposeGlobalShortcut
Functions to set OS wide keyboard shortcuts.

###exposeIpcRenderer
Communication tool to send messages to the background/main process, where you can integrate any Node module. You should avoid using that, since this exposes a big security risk. An exploit here could let the attacker get full access to a client system.

###exposeMenu
Provide API to create Window-Menu and/or Context Menues.

###exposeNativeImage
Manipulate Images.

###exposePrint
A small collection of print related methods.

###exposeProcessInfo
Get access to process information, memory consumption.

###exposeShell
Open links in external applications, open items in folder, move items to trash...

###exposeWebFrame
API to change Browser Zoom, Font Size and such.

###allowDevTools
Should a user be able to open Developer Tools (e.g. through API or keyboard shortcut)?

###openDevToolsRenderer
Opens the browsers developer tools for the **Renderer** when opening a Window. This is meant for **development only**.

###openDevToolsWebview
Opens the browsers developer tools for the **Webview** when opening a Window. This is meant for **development only**.
