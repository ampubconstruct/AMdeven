(function() {
  var start,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  start = (function(_this) {
    return function() {
      var b;
      b = new _this.CrossRenderer();
      return b.start();
    };
  })(this);

  this.Browser = (function() {
    function Browser() {}

    Browser.prototype.url = "file://" + __dirname + "/contents/index.html";

    Browser.prototype.app = require("app");

    Browser.prototype.ipc = require("ipc");

    Browser.prototype.BrowserWindow = require("browser-window");

    Browser.prototype.globalShortcut = require('global-shortcut');

    Browser.prototype.shell = require("shell");

    Browser.prototype.mainWindow = 0;

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
        width: 800,
        height: 800
      });
      this.mainWindow.loadUrl(this.url);
      this.mainWindow.openDevTools();
      return this.mainWindow.on("closed", function() {
        return this.mainWindow = null;
      });
    };

    Browser.prototype.global_shortcut = function() {
      var ret;
      ret = this.globalShortcut.register('ctrl+e', (function(_this) {
        return function() {
          return console.log('ctrl+e is pressed');
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

  this.CrossRenderer = (function(_super) {
    __extends(CrossRenderer, _super);

    function CrossRenderer() {
      return CrossRenderer.__super__.constructor.apply(this, arguments);
    }

    CrossRenderer.prototype.subWindow = 0;

    CrossRenderer.prototype.subWindowUrl = "http://jp.indeed.com/";

    CrossRenderer.prototype.etc = function() {
      CrossRenderer.__super__.etc.call(this);
      return this.set_browser_emit_event();
    };

    CrossRenderer.prototype.start = function() {
      return CrossRenderer.__super__.start.call(this);
    };

    CrossRenderer.prototype.ipc_event = function() {
      CrossRenderer.__super__.ipc_event.call(this);
      return this.ipc_event_renderer();
    };

    CrossRenderer.prototype.make_window = function() {
      CrossRenderer.__super__.make_window.call(this);
      this.add_window();
      this.move_window();
      this.set___ipcEvent_for_external_site();
      return this.set_inspect_mode(this.subWindow);
    };

    CrossRenderer.prototype.move_window = function() {
      this.mainWindow.setTitle("atom-shell MainWindow");
      this.subWindow.setTitle("atom-shell SubWindow");
      return this.shell.openItem("set2renderer.exe");
    };

    CrossRenderer.prototype.add_window = function() {
      this.subWindow = new this.BrowserWindow({
        width: 800,
        height: 800
      });
      this.subWindow.loadUrl(this.subWindowUrl);
      this.subWindow.openDevTools();
      return this.subWindow.on("closed", function() {
        return this.subWindow = null;
      });
    };

    CrossRenderer.prototype.ipc_event_renderer = function() {
      this.ipc.on("send_browser", (function(_this) {
        return function(event, arg) {};
      })(this));
      this.ipc.on("send_renderer_via_browser", (function(_this) {
        return function(event, data, renderer) {
          return _this[renderer].webContents.send("via_browser", data);
        };
      })(this));
      return this.ipc.on("execute_renderer", (function(_this) {
        return function(event, code, renderer) {
          return _this[renderer].webContents.executeJavaScript(code);
        };
      })(this));
    };

    CrossRenderer.prototype.set___ipcEvent_for_external_site = function(renderer) {
      if (renderer == null) {
        renderer = "subWindow";
      }
      return this[renderer].webContents.executeJavaScript("if (typeof ___ipc === \"undefined\" || ___ipc === null) {\n	window.___ipc = require('ipc'); \n	// receive\n	___ipc.on('via_browser', function(data) {console.log(data);});\n	___ipc.on(\"send_renderer_from_browser\", function(data){\n		console.log(data);\n	});\n	// serve\n	___ipc.send('send_renderer_via_browser', 'data_man', 'mainWindow');\n}");
    };

    CrossRenderer.prototype.set_inspect_mode = function(renderer) {
      return renderer.webContents.executeJavaScript('document.addEventListener("mousedown", function(e) {\n	var obj;\n	if (e.button === 2) {\n		obj = {\n			x: e.clientX,\n			y: e.clientY\n		};\n		___ipc.send("inspect element", obj, "subWindow");\n	}\n});');
    };

    CrossRenderer.prototype.set_browser_emit_event = function() {
      var ret;
      return ret = this.globalShortcut.register('Ctrl+Shift+D', (function(_this) {
        return function() {
          _this.mainWindow.webContents.send("send_renderer_from_browser", 321);
          return _this.subWindow.webContents.send("send_renderer_from_browser", 321);
        };
      })(this));
    };

    return CrossRenderer;

  })(this.Browser);

  start();

  1;

}).call(this);

 //# sourceMappingURL=Browser.js.map