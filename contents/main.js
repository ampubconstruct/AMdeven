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
      _this.aa.csv_to_json([0, 1, 2, 3, 4, 5], "./data/test.csv", function(err, arr) {
        return console.log(arr);
      });
      _this.aa.readline("./contents/index.html", function(line) {
        return console.log(line);
      });
      _this.aa.jsdom_check("./contents/index.html", function(errors, _window) {
        var dom, word;
        if (errors) {
          throw errors;
        }
        dom = _window.$("title");
        word = "";
        dom.each(function(e) {
          return word += $(this).text() + "\n";
        });
        return console.log(word);
      });
      _this.es = new _this.aa.es("#foo", "body", "http://google.com", "prepend", "80%", "500px");
      return _this.aa.check_dir_tree("./", /coffee$/, function(loc_file, file) {
        return console.log(loc_file);
      });
    };
  })(this);

  1;

}).call(this);

 //# sourceMappingURL=main.js.map