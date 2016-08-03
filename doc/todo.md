# ToDo

**A list of things we are looking to provide**

* monitor a directory of file for change/add/... using [chokidar](https://github.com/paulmillr/chokidar)
* browse directories
* read/write/copy/delete files
* print files (without printer dialog), methods to choose and set a printer
* read i.e. scanner data when connected to a serial port
* provide a browser-like start-app (favorites, URL/Search-Field, recent pages)
* provide Mac+Windows Release with prebuilt binaries (installer for windows)
* general debug-logging functions, which can be activated/deactivated via config.json (similar to apex.debug)
* add electron systemPreferences functionalities
* add electron DownloadItem (download manager)
* add electron desktopCapturer for capturing videos of running app
* provide configurable option to have a user-config.json to override some (which?) settings -> thus a prebuilt binary can be influenced

# Questions

* how should errors be handled when sending from main to webview? Ignore, throw or passback an error object?
