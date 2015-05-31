"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _NodeApp = require("./NodeApp");

var _NodeApp2 = _interopRequireDefault(_NodeApp);

var _CompilerSrc2 = require("./CompilerSrc");

var _CompilerSrc3 = _interopRequireDefault(_CompilerSrc2);

var CompileAll = (function (_CompilerSrc) {
  function CompileAll() {
    var _this = this;

    _classCallCheck(this, CompileAll);

    _get(Object.getPrototypeOf(CompileAll.prototype), "constructor", this).call(this, false);
    _NodeApp2["default"].prototype.check_dir_tree("./", /(es6|coffee|sass)$/, function (loc, file) {
      if (file.match(/es6$/)) _this.compile_babel(loc);else if (file.match(/coffee$/)) _this.compile_coffee(loc);else if (file.match(/sass$/)) _this.compile_sass(loc);
    });
  }

  _inherits(CompileAll, _CompilerSrc);

  return CompileAll;
})(_CompilerSrc3["default"]);

new CompileAll();