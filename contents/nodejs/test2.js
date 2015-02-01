(function() {
  var aa,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.A = (function() {
    function A() {}

    A.prototype.a = 1;

    return A;

  })();

  this.AA = (function(_super) {
    __extends(AA, _super);

    function AA() {
      return AA.__super__.constructor.apply(this, arguments);
    }

    AA.prototype.b = 2;

    return AA;

  })(this.A);

  aa = new this.AA;

  console.log(aa.a);

  1;

}).call(this);

 //# sourceMappingURL=test2.js.map