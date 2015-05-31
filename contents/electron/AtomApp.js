// Generated by CoffeeScript 1.9.2
(function() {
  var AutoEvent, ExternalSite,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  AutoEvent = require("../proj/web/mylib/am/AutoEvent.js");

  ExternalSite = (function() {

    /*
      document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
      how to use:
        @es = new @ExternalSite "#foo"
     */
    ExternalSite.prototype.webview = null;

    ExternalSite.prototype.ready_flag = 0;

    function ExternalSite(selector, dom, src, which, width, height) {
      var webview;
      this.selector = selector;
      this.dom = dom;
      this.src = src;
      if (which == null) {
        which = "append";
      }
      this.width = width != null ? width : "100%";
      this.height = height != null ? height : "640px";
      this.finish = bind(this.finish, this);
      webview = "<webview id=\"" + this.selector + "\" preload=\"./electron/WebView.js\" src=\"" + this.src + "\"\n  style=\"width:" + this.width + "; height:" + this.height + "; display: block; overflow: hidden;\" nodeintegration>\n</webview>";
      this.$webview = $(webview);
      this.webview = this.$webview[0];
      $(this.dom)[which](this.webview);
      this.webview_event();
      this.$webview.on("did-finish-load", this.finish);
      this.$webview.on("new-window", (function(_this) {
        return function(e) {
          return _this.exejs("location.href = '" + e.url + "'");
        };
      })(this));
    }

    ExternalSite.prototype.webview_event = function() {
      this.$webview.on("console-message", (function(_this) {
        return function(e) {
          return console.log("%c" + e.originalEvent.message, "color: green");
        };
      })(this));
      return this.$webview.on("ipc-message", (function(_this) {
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
      return this.webview.executeJavaScript(code);
    };

    return ExternalSite;

  })();

  this.AtomApp = (function() {
    AtomApp.prototype.inspector_ = 1;

    AtomApp.prototype.ipc = require("ipc");

    AtomApp.prototype.shell = require("shell");

    AtomApp.prototype.gaze = require("gaze");

    AtomApp.prototype.fs = require("fs");

    AtomApp.prototype.ExternalSite = ExternalSite;

    AtomApp.prototype.AutoEvent = AutoEvent;

    function AtomApp() {
      this.init();
      this.live_reload();
    }


    /* 信頼しているメソッドなるべくフロー順 */

    AtomApp.prototype.init = function() {
      if (this.inspector_) {
        this.auto_inspector();
      }
      return this.ipc.on("browser send msg", (function(_this) {
        return function(msg) {
          return console.log(msg);
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

    AtomApp.prototype.live_reload = function() {
      var dir, me;
      me = this;
      dir = ["contents/*.js", "contents/*.html", "contents/electron/**/*.js", "contents/nodejs/**/*.js", "contents/proj/node/**/*.js", "contents/proj/atom/**/*.js", "contents/proj/atom/**/*.html"];
      this.gaze(dir, function(err, watcher) {
        return this.on("changed", (function(_this) {
          return function(filepath) {
            return location.reload();
          };
        })(this));
      });
      dir = ["contents/*.css", "contents/proj/atom/**/*.css"];
      return this.gaze(dir, function(err, watcher) {
        return this.on("changed", (function(_this) {
          return function(filepath) {
            return $("body").append("<style type=\"text/css\">" + (me.fs.readFileSync(filepath, {
              encoding: "utf-8"
            })) + "</style>");
          };
        })(this));
      });
    };

    return AtomApp;

  })();

  module.exports = this.AtomApp;

}).call(this);

//# sourceMappingURL=AtomApp.js.map
