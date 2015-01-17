(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
          if (!filename) {
            return;
          }
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

  this.ExternalSite = (function() {

    /*
    		document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
    		how to use:
    			@es = new @ExternalSite "#foo"
    		console:
    			es.exejs("ipc.sendToHost('test',[1,2,3])")
     */
    ExternalSite.prototype.webview = 0;

    ExternalSite.prototype.ready_flag = 0;

    function ExternalSite(selector) {
      this.selector = selector;
      this.finish = __bind(this.finish, this);
      this.webview = document.querySelector(this.selector);
      this.webview_event();
      this.webview.addEventListener("did-finish-load", this.finish);
    }

    ExternalSite.prototype.webview_event = function() {
      this.webview.addEventListener("console-message", (function(_this) {
        return function(event) {
          return console.log("%c" + event.message, "color: green");
        };
      })(this));
      return this.webview.addEventListener("ipc-message", (function(_this) {
        return function(event) {
          console.log("%c" + event.channel, "color: purple");
          return console.log("%c" + event.args, "color: purple");
        };
      })(this));
    };

    ExternalSite.prototype.finish = function() {
      return ++this.ready_flag;
    };

    ExternalSite.prototype.exejs = function(code) {
      this.webview.executeJavaScript(code);
      return 1;
    };

    ExternalSite.prototype.test = function() {
      var code;
      code = 'document.querySelector("#gbqfq").value = "tarou";';
      return this.webview.executeJavaScript(code);
    };

    return ExternalSite;

  })();

  1;

}).call(this);

 //# sourceMappingURL=AtomApp.js.map