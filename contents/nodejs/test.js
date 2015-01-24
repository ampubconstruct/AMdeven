(function() {
  var NodeJsApp, nja;

  NodeJsApp = require("./NodeJsApp").NodeJsApp;

  nja = new NodeJsApp;

  nja.downloader("https://www.google.co.jp/", "google.html");

}).call(this);

 //# sourceMappingURL=test.js.map