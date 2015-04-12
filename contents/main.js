(function() {
  var code;

  $((function(_this) {
    return function() {
      _this.AtomApp = require("./AtomApp.js");
      _this.aa = new _this.AtomApp();
      _this.aa.start();
      return _this.aa.server.start();
    };
  })(this));

  code = (function(_this) {
    return function() {

      /* add function */
      _this.aa.csv_to_json([1, 2, 3], "./data/test.csv", function(err, arr) {
        return console.log(arr);
      });
      _this.aa.readline("./contents/index.html", function(line) {
        return console.log(line);
      });
      _this.aa.jsdom_check("./contents/index.html", "title");
      _this.es = new _this.aa.es("#foo", "body", "http://google.com", "prepend", "80%", "500px");
      return _this.aa.check_dir_tree("./", /coffee$/, function(loc_file, file) {
        return console.log(loc_file);
      });
    };
  })(this);

  1;

}).call(this);

 //# sourceMappingURL=main.js.map