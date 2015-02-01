(function() {
  var NodeJsApp, nja;

  NodeJsApp = require("./NodeJsApp").NodeJsApp;

  nja = new NodeJsApp;

  console.log = nja;

  1;

}).call(this);
