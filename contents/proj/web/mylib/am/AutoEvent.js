// Generated by CoffeeScript 1.9.3
(function() {
  var code,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.AutoEvent = (function() {
    function AutoEvent() {
      this.set_event = bind(this.set_event, this);
      this.funcs = [];
      this.gen = this.auto_event();
    }

    AutoEvent.prototype.start = function() {
      return this.gen.next();
    };

    AutoEvent.prototype.set_event = function(callback, wait_msec) {
      return this.funcs.push((function(_this) {
        return function() {
          return setTimeout(function() {
            callback();
            return _this.gen.next();
          }, wait_msec);
        };
      })(this));
    };

    AutoEvent.prototype.auto_event = function*() {
      var num, results;
      num = 0;
      results = [];
      while (this.funcs[num]) {
        results.push((yield this.funcs[num++]()));
      }
      return results;
    };

    return AutoEvent;

  })();


  /* sample */

  code = (function(_this) {
    return function() {
      var callback, i, j;
      _this.aae = new _this.AutoEvent();
      callback = function() {
        return console.log(Date.now());
      };
      for (i = j = 1; j <= 10; i = ++j) {
        _this.aae.set_event(callback, 300);
      }
      return _this.aae.start();
    };
  })(this);

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.AutoEvent;
  }

}).call(this);
