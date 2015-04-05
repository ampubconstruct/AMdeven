
/*
2015/02/11: goBackを使うと、wvが使えなくなる模様
 */

(function() {
  var Crawler, WebView,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  WebView = (function() {
    WebView.prototype.ipc = require("ipc");

    WebView.prototype.fs = require("fs");

    WebView.prototype.shell = require("shell");

    WebView.prototype.jq = "./contents/web/lib/jquery-2.0.3.min.js";

    function WebView() {
      var data;
      data = this.fs.readFileSync(this.jq, {
        encoding: "utf-8"
      });
      eval(data);
      this.jq = $;
      eval('$ = null;jQuery = null;');
    }

    WebView.prototype.set_event = function() {
      this.ipc.on("keydown", (function(_this) {
        return function(selector, keyCode) {
          return _this.set_keydown_event(selector, keyCode);
        };
      })(this));
      this.ipc.on("mousedown", (function(_this) {
        return function(ratio, selector) {
          if (ratio == null) {
            ratio = 0.5;
          }
          if (selector == null) {
            selector = "body";
          }
          return _this.jq(selector).css("transform", "scale(" + ratio + ", " + ratio + ")");
        };
      })(this));
      return this.ipc.on("set scale", (function(_this) {
        return function(ratio, selector) {
          if (ratio == null) {
            ratio = 0.5;
          }
          if (selector == null) {
            selector = "body";
          }
          return _this.jq(selector).css("transform", "scale(" + ratio + ", " + ratio + ")");
        };
      })(this));
    };

    WebView.prototype.set_keydown_event = function(selector, keyCode) {
      var e;
      this.jq(selector).focus();
      e = this.jq.Event("keypress");
      e.which = keyCode;
      this.jq(selector).val(this.jq(selector).val() + String.fromCharCode(e.which));
      return this.jq(selector).trigger(e);
    };

    WebView.prototype.start = function() {
      return 1;
    };

    return WebView;

  })();

  Crawler = (function(_super) {
    __extends(Crawler, _super);

    function Crawler() {
      return Crawler.__super__.constructor.apply(this, arguments);
    }

    Crawler.prototype.set_event = function() {
      Crawler.__super__.set_event.call(this);
      return this.crawler_event();
    };

    Crawler.prototype.crawler_event = function() {};

    return Crawler;

  })(WebView);

  eval("wv = new Crawler();");

  wv.set_event();

  console.log("webview preload finished");

}).call(this);

 //# sourceMappingURL=WebView.js.map