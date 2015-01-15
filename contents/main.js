
/*
document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
how to use:
	@es = new @ExternalSite "#foo"
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.ExternalSite = (function() {
    ExternalSite.prototype.webview = 0;

    ExternalSite.prototype.ready_flag = 0;

    ExternalSite.prototype.jq_flag = "2.1.3";

    function ExternalSite(selector) {
      this.selector = selector;
      this.finish = __bind(this.finish, this);
      this.webview = document.querySelector(this.selector);
      this.webview_event();
      this.webview.addEventListener("did-finish-load", this.finish);
    }

    ExternalSite.prototype.webview_event = function() {
      return this.webview.addEventListener("console-message", (function(_this) {
        return function(event) {
          return console.log("%c" + event.message, "color: green");
        };
      })(this));
    };

    ExternalSite.prototype.finish = function() {
      ++this.ready_flag;

      /*jQuery */
      if (this.jq_flag) {
        this.exejs(" //\"\n//# read jQuery\nif (!window.jQuery) {\n		document.body.appendChild((function(){\n				var s = document.createElement(\"script\");\n				s.type = \"text/javascript\";\n				s.src = \"http://ajax.googleapis.com/ajax/libs/jquery/" + this.jq_flag + "/jquery.min.js\"; \n				return s;\n		})())\n};\n//# set key press Event\nwindow.triggerKeyDown = function (selector, keyCode) {\n	$(selector).focus();\n	var e;\n	// Enter Keyの処理\n	if (keyCode === 13) e = jQuery.Event(\"keypress\");\n	else e = jQuery.Event(\"keyup\");\n	e.which = keyCode; // # Some key code value\n	$(selector).val($(selector).val() + String.fromCharCode(e.which));\n	$(selector).trigger(e);\n}");
      }

      /*内包コード */
      return 1;
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

  $((function(_this) {
    return function() {
      return _this.es = new _this.ExternalSite("#foo");
    };
  })(this));

  1;

  1;

}).call(this);

 //# sourceMappingURL=main.js.map