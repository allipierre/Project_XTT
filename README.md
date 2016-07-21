# APEX Client Extension (ACE)

**Clone and run for a quick way to see the ACE Browser in action.**

This is a configurable Browser based on the awesome [Electron](http://electron.atom.io). It adds several client-features to your Oracle APEX application.

All you need to change is the [`features.json`](doc/features.md) file, where you define which features should be enabled in your APEX application:

- access to the clipboard
- definition of global keyboard shortcuts
- window level menues
- read/write files on the client
- desktop notifications
- run shell scripts on client
- many more to come

# Watch out: still in early Alpha status !!
Don't just grab the sources and use them in production, we are in a very early stage and everything can still change.

There are also some technical hurdles we still have to take, bevor everything will work and be stable.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/FOEXgmbh/apex-client-extension
# Go into the repository
cd apex-client-extension
# Install dependencies and run the app
npm install && npm start
```

Learn more about the APEX Client Extension and its API in the [documentation](doc/doc.md).

## Roadmap
Documentation, more APIs, Security, Demos...

**Want to get involved and contribute?** Mail me at [peter.raganitsch@tryfoexnow.com](mailto:peter.raganitsch@tryfoexnow.com)

#### License: [MIT](LICENSE.md)

A big **"Thank You"** goes to [FOEX](https://www.tryfoexnow.com) for sponsoring this project.