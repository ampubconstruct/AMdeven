(function() {
  var test;

  $((function(_this) {
    return function() {

      /*required */
      _this.aa = new _this.AtomApp;
      return _this.aa.start();
    };
  })(this));

  test = (function(_this) {
    return function() {

      /*add function */
      _this.aa.server.start();

      /*external site */
      _this.es = new _this.ExternalSite("#foo");

      /*check directory tree */
      return _this.aa.check_dir_tree("./", /coffee$/, function(loc_file, file) {
        return console.log(loc_file);
      });
    };
  })(this);

}).call(this);

 //# sourceMappingURL=main.js.map