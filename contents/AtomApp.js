(function() {
  $((function(_this) {
    return function() {
      _this.aa = new _this.AtomApp;
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

  1;

  1;

}).call(this);

 //# sourceMappingURL=AtomApp.js.map