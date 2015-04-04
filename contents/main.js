(function() {
  var code;

  $((function(_this) {
    return function() {
      _this.AtomApp = require("./AtomApp.js");
      _this.aa = new _this.AtomApp();
      _this.aa.start();
      _this.aa.server.start();
      return _this.es = new _this.aa.es("#foo", "body", "http://google.com", "prepend", "80%", "500px");
    };
  })(this));

  code = (function(_this) {
    return function() {

      /* add function */
      _this.aa.jsdom_check("./contents/index.html", "title");
      _this.es = new _this.aa.es("#foo", "body", "http://google.com", "prepend", "80%", "500px");
      return _this.aa.check_dir_tree("./", /coffee$/, function(loc_file, file) {
        return console.log(loc_file);
      });
    };
  })(this);

}).call(this);

 //# sourceMappingURL=main.js.map