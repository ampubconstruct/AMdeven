(function() {
  var WebView;

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

    WebView.prototype.start = function() {
      return this.jq((function(_this) {
        return function() {
          console.log("webview load finished");
          return _this.jq("a").click(function(e) {
            return _this.shell.openExternal(_this.jq("a").attr("href"));
          });
        };
      })(this));
    };

    return WebView;

  })();

  eval("wv = new WebView();");

  wv.start();

  wv.set_event();

  console.log("webview preload finished");

}).call(this);

 //# sourceMappingURL=WebView.js.map