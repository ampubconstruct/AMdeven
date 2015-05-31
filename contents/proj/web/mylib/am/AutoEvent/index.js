/*
var ae = new AutoEvent()
ae.click(selector).wait(3000).click(selector)
ae.start()
*/

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutoEvent = (function () {
  function AutoEvent() {
    _classCallCheck(this, AutoEvent);
  }

  _createClass(AutoEvent, [{
    key: "later",
    value: function later() {
      // 追加
      return new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
      });
    }
  }, {
    key: "contoller",
    value: regeneratorRuntime.mark(function contoller() {
      var i;
      return regeneratorRuntime.wrap(function contoller$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            i = -1;

          case 1:
            if (!this.funcs[++i]) {
              context$2$0.next = 7;
              break;
            }

            this.inner_funcs[i].push(function () {
              return _this.gen.next();
            });
            context$2$0.next = 5;
            return this.funcs[i]();

          case 5:
            context$2$0.next = 1;
            break;

          case 7:
          case "end":
            return context$2$0.stop();
        }
      }, contoller, this);
    })
  }, {
    key: "register",
    value: function register() {
      this.funcs = [];
      this.inner_funcs = [];
      this.gen = this.contoller();
      this.func_num = -1;
      return this;
    }
  }, {
    key: "add_event",

    // event群
    value: function add_event(callback) {
      var func_num = this.func_num;
      var inner_func = this.inner_funcs[func_num];
      inner_func.push(callback);
      return this;
    }
  }, {
    key: "set_value",
    value: function set_value(selector, value) {
      return this.add_event(function () {
        return document.querySelector(selector).value = value;
      });
    }
  }, {
    key: "click",
    value: function click(selector) {
      return this.add_event(function () {
        return document.querySelector(selector).click();
      });
    }
  }, {
    key: "wait_event",

    // async群
    value: function wait_event(callback) {
      this.funcs.push(callback);
      return this;
    }
  }, {
    key: "wait",
    value: function wait(msec) {
      var func_num = ++this.func_num;
      var inner_func = this.inner_funcs[func_num] = [];
      var func = function func() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = inner_func[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _func = _step.value;
            _func();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      };
      var testTimer = null;
      return this.wait_event(function () {
        return setTimeout(func, msec);
      });
    }
  }, {
    key: "wait_selector",
    value: function wait_selector(selector) {
      var exists = arguments[1] === undefined ? true : arguments[1];

      var func_num = ++this.func_num;
      var inner_func = this.inner_funcs[func_num] = [];
      var func = function func() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = inner_func[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _func2 = _step2.value;
            _func2();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      };
      var testTimer = null;
      var stop_timer = function stop_timer() {
        clearInterval(testTimer);
        func();
      };
      return this.wait_event(function () {
        testTimer = setInterval(function () {
          if (document.querySelector(selector) && exists) stop_timer();
        }, 100);
      });
    }
  }]);

  return AutoEvent;
})();

document.addEventListener("DOMContentLoaded", function () {
  window.ae = new AutoEvent();
  ae.register().wait(1000).click(".text").click(".text").wait(1500).click(".text").set_value("#text", 300).wait_selector(".super-test").set_value("#text", 3000).gen.next();
});
// ae.start()