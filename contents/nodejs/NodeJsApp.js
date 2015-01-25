(function() {
  this.NodeJsApp = (function() {
    function NodeJsApp() {}

    NodeJsApp.prototype.http = require("http");

    NodeJsApp.prototype.https = require("https");

    NodeJsApp.prototype.fs = require("fs");

    NodeJsApp.prototype.downloader = function(url, filepath) {
      var file, protocol, request;
      file = this.fs.createWriteStream(filepath);
      protocol = url.match(/^https/) ? this.https : this.http;
      return request = protocol.get(url, (function(_this) {
        return function(response) {
          return response.pipe(file);
        };
      })(this));
    };

    return NodeJsApp;

  })();

  1;

}).call(this);

 //# sourceMappingURL=NodeJsApp.js.map