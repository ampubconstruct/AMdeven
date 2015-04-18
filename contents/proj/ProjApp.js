(function() {
  var NodeApp,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  NodeApp = require("../nodejs/NodeApp.js");

  this.ProjApp = (function(_super) {
    __extends(ProjApp, _super);

    function ProjApp() {
      return ProjApp.__super__.constructor.apply(this, arguments);
    }

    return ProjApp;

  })(NodeApp);

  module.exports = this.ProjApp;

}).call(this);

 //# sourceMappingURL=ProjApp.js.map