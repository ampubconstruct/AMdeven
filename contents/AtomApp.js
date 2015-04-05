(function() {
  var ExternalSite, NodeJsApp,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  NodeJsApp = require("./nodejs/App.js");

  ExternalSite = (function() {

    /*
    		document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
    		how to use:
    			@es = new @ExternalSite "#foo"
    		console:
    			es.exejs("ipc.sendToHost('test',[1,2,3])")
     */
    ExternalSite.prototype.webview = 0;

    ExternalSite.prototype.ready_flag = 0;

    function ExternalSite(_at_selector, _at_dom, _at_src, which, _at_width, _at_height) {
      var webview;
      this.selector = _at_selector;
      this.dom = _at_dom;
      this.src = _at_src;
      if (which == null) {
        which = "append";
      }
      this.width = _at_width != null ? _at_width : "100%";
      this.height = _at_height != null ? _at_height : "640px";
      this.finish = __bind(this.finish, this);
      webview = "<webview id=\"" + this.selector + "\" preload=\"./webview.js\" src=\"" + this.src + "\"\n	style=\"width:" + this.width + "; height:" + this.height + "; display: block; overflow: hidden;\" nodeintegration>\n</webview>";
      this.webview = $(webview);
      $(this.dom)[which](this.webview);
      this.webview_event();
      this.webview.on("did-finish-load", this.finish);
      this.webview.on("new-window", (function(_this) {
        return function(e) {
          return _this.exejs("location.href = '" + e.url + "'");
        };
      })(this));
    }

    ExternalSite.prototype.webview_event = function() {
      this.webview.on("console-message", (function(_this) {
        return function(e) {
          return console.log("%c" + e.originalEvent.message, "color: green");
        };
      })(this));
      return this.webview.on("ipc-message", (function(_this) {
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

  this.AtomApp = (function(_super) {
    __extends(AtomApp, _super);

    AtomApp.prototype.reload_ = 1;

    AtomApp.prototype.inspector_ = 1;

    AtomApp.prototype.es = ExternalSite;

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

  })(NodeJsApp);

  module.exports = this.AtomApp;

}).call(this);

 //# sourceMappingURL=AtomApp.js.map