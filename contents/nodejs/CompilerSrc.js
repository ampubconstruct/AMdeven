"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var babel = require("babel");
var exec = require("child_process").exec;
var fs = require("fs");

var CompilerSrc = (function () {
  function CompilerSrc() {
    _classCallCheck(this, CompilerSrc);
  }

  _createClass(CompilerSrc, [{
    key: "log",
    value: function log(msg) {
      try {
        process.send(msg);
      } catch (e) {
        console.log(msg);
      }
    }
  }, {
    key: "compile_babel",
    value: function compile_babel(filepath) {
      // babel.transformFile(filepath, { stage: 0 }, (e, result) => {
      babel.transformFile(filepath, { stage: 0 }, function (e, result) {
        if (e) return CompilerSrc.prototype.log(e.message);
        CompilerSrc.prototype.log("compile " + filepath);
        fs.writeFile(filepath.replace(/\.es6$/, ".js"), result.code);
      });
    }
  }, {
    key: "compile_coffee",
    value: function compile_coffee(filepath) {
      var command = "node ./node_modules/coffee-script/bin/coffee -c " + filepath;
      exec(command, function (e, stdout, stderr) {
        if (e) return CompilerSrc.prototype.log(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"));
        CompilerSrc.prototype.log("compile " + filepath);
      });
    }
  }, {
    key: "compile_sass",
    value: function compile_sass(filepath) {
      var command = "sass " + filepath;
      exec(command, function (e, stdout, stderr) {
        if (e) return CompilerSrc.prototype.log(stderr);
        var command = "sass " + filepath + " " + filepath.replace(/sass$/, "css");
        exec(command);
        CompilerSrc.prototype.log("compile " + filepath);
      });
    }
  }]);

  return CompilerSrc;
})();

exports["default"] = CompilerSrc;
module.exports = exports["default"];

/*
CompilerSrc.prototype.compile_babel("./contents/nodejs/CompilerSrc.es6")
CompilerSrc.prototype.compile_coffee("./contents/main.coffee")
CompilerSrc.prototype.compile_sass("./contents/default.sass")
*/