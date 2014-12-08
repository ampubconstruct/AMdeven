(function() {
  this.AtomApp = (function() {
    AtomApp.prototype.reload_ = 1;

    function AtomApp() {
      this.init();
    }

    AtomApp.prototype.init = function() {
      return this.fs = require("fs");
    };

    AtomApp.prototype.start = function() {
      if (this.reload_) {
        return this.auto_reload();
      }
    };

    AtomApp.prototype.auto_reload = function() {
      var flag;
      flag = false;
      return this.fs.watch("contents", (function(_this) {
        return function(e, filename) {
          if (_this.reload_ && !flag) {
            return setTimeout(function() {
              flag = true;
              return location.reload();
            }, 1000);
          }
        };
      })(this));
    };

    return AtomApp;

  })();

  $((function(_this) {
    return function() {
      _this.aa = new _this.AtomApp;
      return aa.start();
    };
  })(this));

}).call(this);

 //# sourceMappingURL=AtomApp.js.map