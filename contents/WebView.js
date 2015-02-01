(function() {
  var WebView;

  WebView = (function() {
    WebView.prototype.ipc = require("ipc");

    WebView.prototype.fs = require("fs");

    WebView.prototype.shell = require("shell");

    WebView.prototype.jq = 0;

    function WebView() {
      var data;
      data = this.fs.readFileSync("./contents/jquery-2.0.3.min.js", {
        encoding: "utf-8"
      });
      eval(data);
      this.jq = $;
      eval('$ = null;jQuery = null;');
    }

    WebView.prototype.set_event = function() {
      return this.ipc.on("keydown", (function(_this) {
        return function(selector, keyCode) {
          return _this.set_keydown_event(selector, keyCode);
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

    return WebView;

  })();

  eval("wv = new WebView();");

  wv.set_event();

  console.log("preload finished, webview");

}).call(this);
