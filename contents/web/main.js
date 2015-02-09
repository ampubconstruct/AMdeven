$((function(_this) {
  return function() {
    _this.aac = new _this.AtomAppClient;
    return console.log(2);
  };
})(this));

this.perfectSquares = function*() {
  var num;
  num = 0;
  while (true) {
    num += 1;
    console.log(num);
    if (num > 5) {
      return;
    }
    (yield num * num);
  }
};

window.ps || (window.ps = perfectSquares());

ps.next();

ps.next();

ps.next();

1;
