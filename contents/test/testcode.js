"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var ToleranceIndicator = (function (_React$Component) {
  function ToleranceIndicator() {
    _classCallCheck(this, ToleranceIndicator);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(ToleranceIndicator, _React$Component);

  _createClass(ToleranceIndicator, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "p",
        { className: "toleranceValue" },
        this.printTolerance()
      );
    }
  }, {
    key: "printTolerance",
    value: function printTolerance() {
      return this.props.tolerance === 0 ? "" : "±" + this.props.tolerance + "%";
    }
  }]);

  return ToleranceIndicator;
})(React.Component);

exports["default"] = ToleranceIndicator;
module.exports = exports["default"];