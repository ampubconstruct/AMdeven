(function() {
  var start;

  start = (function(_this) {
    return function() {
      var b, p;
      b = new _this.Browser();
      b.start();
      return p = new _this.Pipe();
    };
  })(this);

  this.Browser = (function() {
    Browser.prototype.url = "file://" + __dirname + "/contents/index.html";

    Browser.prototype.cson_path = "./browser.cson";

    Browser.prototype.fs = require("fs");

    Browser.prototype.app = require("app");

    Browser.prototype.ipc = require("ipc");

    Browser.prototype.cson = require("cson");

    Browser.prototype.BrowserWindow = require("browser-window");

    Browser.prototype.globalShortcut = require('global-shortcut');

    Browser.prototype.shell = require("shell");

    Browser.prototype.mainWindow = 0;

    function Browser() {
      var key, result, val;
      result = this.cson.load("./browser.cson");
      for (key in result) {
        val = result[key];
        this[key] = val;
      }
    }

    Browser.prototype.start = function() {
      require("crash-reporter").start();
      this.ipc_event();
      return this.app_start();
    };

    Browser.prototype.ipc_event = function() {
      return this.ipc.on('inspect element', (function(_this) {
        return function(event, arg, renderer) {
          return _this[renderer].inspectElement(arg.x, arg.y);
        };
      })(this));
    };

    Browser.prototype.app_start = function() {
      this.app.on("window-all-closed", (function(_this) {
        return function() {
          if (process.platform !== "darwin") {
            return _this.app.quit();
          }
        };
      })(this));
      return this.app.on("ready", (function(_this) {
        return function() {
          _this.make_window();
          return _this.etc();
        };
      })(this));
    };

    Browser.prototype.make_window = function() {
      this.mainWindow = new this.BrowserWindow({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      });
      this.mainWindow.loadUrl(this.url);
      this.mainWindow.openDevTools();
      console.log;
      return this.mainWindow.on("close", (function(_this) {
        return function(e) {
          var cson_string, obj, wh, xy;
          xy = _this.mainWindow.getPosition();
          wh = _this.mainWindow.getSize();
          obj = {
            x: xy[0],
            y: xy[1],
            width: wh[0],
            height: wh[1]
          };
          cson_string = _this.cson.createCSONString(obj);
          _this.fs.writeFileSync(_this.cson_path, cson_string);
          return _this.mainWindow = null;
        };
      })(this));
    };

    Browser.prototype.global_shortcut = function() {
      var ret;
      ret = this.globalShortcut.register('ctrl+e', (function(_this) {
        return function() {
          return console.log((Date.now()) + " , ctrl+e is pressed");
        };
      })(this));
      return 1;
    };

    Browser.prototype.etc = function() {
      return this.global_shortcut();
    };

    1;

    return Browser;

  })();

  this.Pipe = (function() {
    function Pipe() {
      process.stdin.setEncoding("utf8");
      process.stdin.on("readable", function() {
        var chunk;
        chunk = process.stdin.read();
        return console.log(chunk);
      });
    }

    return Pipe;

  })();

  start();

  1;

}).call(this);

 //# sourceMappingURL=Browser.js.map