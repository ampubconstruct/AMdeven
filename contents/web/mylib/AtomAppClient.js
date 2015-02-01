(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.AtomAppClient = (function(_super) {
    __extends(AtomAppClient, _super);


    /*modules */

    AtomAppClient.prototype.ws = 1;


    /*websocket required variables */

    AtomAppClient.prototype.domain = location.host.replace(/:.*/, "");

    AtomAppClient.prototype.params = 0;

    function AtomAppClient() {
      this.params = this.get_params(location.href);
      if (this.params.ws) {
        this.connect_websocket();
      }
    }

    AtomAppClient.prototype.connect_websocket = function() {
      this.ws_url = "ws://" + this.domain + ":" + this.ws_port;
      this.ws = io(this.ws_url);
      return this.ws.on("connect", (function(_this) {
        return function() {
          console.log("websocket connected");
          if (_this.params.g) {
            _this.ws.emit("g", _this.params.g);
          }
          return _this.ws.on("reload", function() {
            return location.reload();
          });
        };
      })(this));
    };

    return AtomAppClient;

  })(this.CommonJsAroundProtocol);

}).call(this);

 //# sourceMappingURL=AtomAppClient.js.map