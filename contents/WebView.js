(function() {
  var WebView;

  WebView = (function() {
    function WebView() {
      var data;
      eval('ipc = require("ipc")');
      eval('fs = require("fs")');
      data = fs.readFileSync("./contents/jquery-2.0.3.min.js", {
        encoding: "utf-8"
      });
      eval(data);
      eval('JQ = $;$ = null;jQuery = null;');
    }

    WebView.prototype.set_event = function() {
      return ipc.on("keydown", (function(_this) {
        return function(selector, keyCode) {
          return _this.set_keydown_event(selector, keyCode);
        };
      })(this));
    };

    WebView.prototype.set_keydown_event = function(selector, keyCode) {
      var e;
      JQ(selector).focus();
      e = JQ.Event("keypress");
      e.which = keyCode;
      JQ(selector).val(JQ(selector).val() + String.fromCharCode(e.which));
      return JQ(selector).trigger(e);
    };

    return WebView;

  })();

  eval("wv = new WebView();");

  wv.set_event();

  console.log("preload finished, webview");

}).call(this);

 //# sourceMappingURL=WebView.js.map