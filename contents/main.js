(function() {
  var test;

  $((function(_this) {
    return function() {

      /*required */
      _this.aa = new _this.AtomApp;
      _this.aa.start();

      /*add function */
      _this.aa.server.start();
      return _this.es = new _this.ExternalSite("#foo");
    };
  })(this));

  test = (function(_this) {
    return function() {
      return _this.aa.check_dir_tree("./", function(loc, file) {
        return console.log(file);
      });
    };
  })(this);

}).call(this);

 //# sourceMappingURL=main.js.map