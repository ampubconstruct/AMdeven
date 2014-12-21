(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $((function(_this) {
    return function() {
      _this.aa = new _this.CrossRendererApp;
      return aa.start();
    };
  })(this));

  this.AtomApp = (function() {
    AtomApp.prototype.reload_ = 1;

    AtomApp.prototype.inspector_ = 1;

    function AtomApp() {
      this.init();
    }

    AtomApp.prototype.init = function() {
      this.fs = require("fs");
      return this.ipc = require("ipc");
    };

    AtomApp.prototype.start = function() {
      if (this.reload_) {
        this.auto_reload();
      }
      if (this.inspector_) {
        return this.auto_inspector();
      }
    };

    AtomApp.prototype.auto_reload = function() {
      return this.fs.watch("contents", (function(_this) {
        return function(e, filename) {
          if (filename.match(/\.(html)|(js)|(css)$/)) {
            return location.reload();
          } else {
            return 1;
          }
        };
      })(this));
    };

    AtomApp.prototype.auto_inspector = function() {
      return $(document).on("mousedown", (function(_this) {
        return function(e) {
          var obj;
          if (e.button === 2) {
            obj = {
              x: e.clientX,
              y: e.clientY
            };
            return _this.ipc.send('inspect element', obj, "mainWindow");
          }
        };
      })(this));
    };

    return AtomApp;

  })();

  this.CrossRendererApp = (function(_super) {
    __extends(CrossRendererApp, _super);

    function CrossRendererApp() {
      return CrossRendererApp.__super__.constructor.apply(this, arguments);
    }

    CrossRendererApp.prototype.start = function() {
      CrossRendererApp.__super__.start.call(this);
      return this.set_browser_event();
    };

    CrossRendererApp.prototype.send = function(data) {
      return this.ipc.send("send_browser", data);
    };

    CrossRendererApp.prototype.send_renderer = function(data, renderer) {
      if (data == null) {
        data = {};
      }
      if (renderer == null) {
        renderer = "subWindow";
      }
      return this.ipc.send("send_renderer_via_browser", data, renderer);
    };

    CrossRendererApp.prototype.execute_renderer = function(code, renderer) {
      if (code == null) {
        code = "console.log(123);";
      }
      if (renderer == null) {
        renderer = "subWindow";
      }
      return this.ipc.send("execute_renderer", code, renderer);
    };

    CrossRendererApp.prototype.set_ipcEvent_for_external_site = function(renderer) {
      if (renderer == null) {
        renderer = "subWindow";
      }
      return this.execute_renderer("if (typeof ___ipc === \"undefined\" || ___ipc === null) {\n	window.___ipc = require('ipc'); \n	___ipc.on('via_browser', function(data) {console.log(data);})\n}", renderer);
    };

    CrossRendererApp.prototype.set_browser_event = function() {
      return this.ipc.on("send_renderer_from_browser", (function(_this) {
        return function(data) {
          return console.log(data);
        };
      })(this));
    };

    return CrossRendererApp;

  })(this.AtomApp);

}).call(this);

 //# sourceMappingURL=AtomApp.js.map