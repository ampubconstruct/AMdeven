"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _NodeProjApp2 = require("./NodeProjApp");

var _NodeProjApp3 = _interopRequireDefault(_NodeProjApp2);

var NodeProjAppEs6 = (function (_NodeProjApp) {
  function NodeProjAppEs6() {
    _classCallCheck(this, NodeProjAppEs6);

    _get(Object.getPrototypeOf(NodeProjAppEs6.prototype), "constructor", this).call(this);
  }

  _inherits(NodeProjAppEs6, _NodeProjApp);

  return NodeProjAppEs6;
})(_NodeProjApp3["default"]);

exports["default"] = NodeProjAppEs6;

var sample_code = function sample_code() {
  undefined.server.start();
  undefined.csv_to_json([1, 2, 3, 4, 5], "./data/test.csv", function (err, arr) {
    return console.log(arr);
  });
  undefined.readline_func("./contents/index.html", function (line) {
    return console.log(line);
  });
  // this.jsdom_check("./contents/index.html", (errors, _window) => {
  undefined.jsdom_check("http://www.homes.co.jp/chintai/tokyo/akihabara_00592-st/list/?page=1", function (errors, _window) {
    if (errors) throw errors;
    var dom = _window.$("title");
    var word = "";
    dom.each(function (e) {
      word += $(this).text() + "\n";
    });
    console.log(word);
  });
  undefined.check_dir_tree("./", /coffee$/, function (loc, file) {
    return console.log(loc);
  });
};
module.exports = exports["default"];
// _window.close() // error