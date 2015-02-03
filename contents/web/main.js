(function() {
  $((function(_this) {
    return function() {
      return _this.aac = new _this.AtomAppClient;
    };
  })(this));

  this.perfectSquares = function*() {
    var num;
    num = 0;
    while (true) {
      num += 1;
      console.log(num);
      (yield num * num);
    }
  };

  window.ps || (window.ps = perfectSquares());

}).call(this);

 //# sourceMappingURL=main.js.map