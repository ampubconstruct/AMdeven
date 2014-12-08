(function() {
  var BrowserWindow, app, mainWindow;

  app = require("app");

  BrowserWindow = require("browser-window");

  require("crash-reporter").start();

  mainWindow = null;

  console.log(this);

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

}).call(this);

 //# sourceMappingURL=main.js.map