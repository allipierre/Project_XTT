# APEX Client Extension - Documentation

The APEX Client Extension (ACE) Browser automatically injects global Javascript APIs into any loaded APEX Page.

Those APIs are available under the top level namespace **apexce** (we figured using ace would have been too corny).

The main goal of the ACE Browser is to open up selected resources from the client computer, but at the same time we try to maintain a secure application.
To achieve that we let you access some of the Electron APIs directly, but will wrap most sensitive ones.

Current available APIs:

* [clipboard](http://electron.atom.io/docs/api/clipboard/)
* [shell](http://electron.atom.io/docs/api/shell/)
* [processInfo](http://electron.atom.io/docs/api/process/)
* [webFrame](http://electron.atom.io/docs/api/web-frame/)
* fs


# Known Issues

* iFrames (like a modal page in APEX) need to access the APIs through `top.apexce.<API>`
* ...this could probably be an endless list, since this is still Alpha..


# Roadmap

We are looking to provide also this functionality

* Read/Write files
* Read/Monitor directories
* Desktop Notification
* Screen Captures
* Global (event outside the application) keyboard shortcuts
* Run Shell scripts/commands
* Read Client machine information (env)
* and much more 