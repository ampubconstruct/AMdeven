(function() {
  var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  this.NodeClient = (function(_super) {
    __extends(NodeClient, _super);


    /*modules */

    NodeClient.prototype.ws = 1;


    /*websocket required variables */

    NodeClient.prototype.domain = location.host.replace(/:.*/, "");

    NodeClient.prototype.params = 0;

    function NodeClient() {
      this.params = this.get_params(location.href);
      if (this.params.ws) {
        this.connect_websocket();
      }
    }

    NodeClient.prototype.connect_websocket = function() {
      var protocol;
      if (this.ws_port === 8080) {
        if (!location.host.match(/[0-9].+[0-9]+.[0-9].+[0-9]+/)) {
          this.ws_port = 80;
        }
        if (!location.host.match(/^192/)) {
          this.ws_port = 80;
        }
      }
      protocol = location.href.match(/^https/) ? "wss" : "ws";
      if (this.ws_port === 80) {
        this.ws_url = protocol + "://" + this.domain;
      } else {
        this.ws_url = protocol + "://" + this.domain + ":" + this.ws_port;
      }
      this.ws = io(this.ws_url);
      return this.ws.on("connect", (function(_this) {
        return function() {
          console.log("websocket connected");
          if (_this.params.g) {
            _this.ws.emit("g", (typeof _this.params.g === "object" ? _this.params.g : [_this.params.g]));
          }
          return _this.ws.on("reload", function() {
            return location.reload();
          });
        };
      })(this));
    };

    return NodeClient;

  })(this.CommonJs);

}).call(this);

 //# sourceMappingURL=NodeClient.js.map