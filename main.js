(function() {
  var BrowserWindow, app, globalShortcut, ipc, mainWindow;

  app = require("app");

  ipc = require("ipc");

  BrowserWindow = require("browser-window");

  globalShortcut = require('global-shortcut');

  require("crash-reporter").start();

  mainWindow = null;

  ipc.on('inspect element', (function(_this) {
    return function(event, arg) {
      console.log(arg);
      return mainWindow.inspectElement(arg.x, arg.y);
    };
  })(this));

  app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
      return app.quit();
    }
  });

  app.on("ready", function() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 800
    });
    mainWindow.loadUrl("file://" + __dirname + "/contents/index.html");
    mainWindow.openDevTools();
    return mainWindow.on("closed", function() {
      return mainWindow = null;
    });
  });

  1;

}).call(this);

 //# sourceMappingURL=main.js.map