(function() {
  var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.AtomApp = (function(_super) {
    __extends(AtomApp, _super);

    AtomApp.prototype.reload_ = 1;

    AtomApp.prototype.inspector_ = 1;

    AtomApp.prototype.ipc = require("ipc");

    AtomApp.prototype.shell = require("shell");

    function AtomApp() {
      this.init();
    }

    AtomApp.prototype.init = function() {
      return 1;
    };

    AtomApp.prototype.start = function() {
      if (this.inspector_) {
        return this.auto_inspector();
      }
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

  })(this.NodeJsApp);

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

    function ExternalSite(_at_selector) {
      this.selector = _at_selector;
      this.finish = __bind(this.finish, this);
      this.webview = document.querySelector(this.selector);
      this.webview_event();
      this.webview.addEventListener("did-finish-load", this.finish);
      this.webview.addEventListener("new-window", (function(_this) {
        return function(e) {
          return _this.exejs("location.href = '" + e.url + "'");
        };
      })(this));
    }

    ExternalSite.prototype.webview_event = function() {
      this.webview.addEventListener("console-message", (function(_this) {
        return function(e) {
          return console.log("%c" + e.message, "color: green");
        };
      })(this));
      return this.webview.addEventListener("ipc-message", (function(_this) {
        return function(e) {
          return console.log("%c" + e.channel + " " + e.args, "color: purple");
        };
      })(this));
    };

    ExternalSite.prototype.finish = function() {
      ++this.ready_flag;
      return console.log("webview ready");
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