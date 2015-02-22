(function() {
  var Server,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Server = (function(_super) {
    __extends(Server, _super);

    function Server() {
      return Server.__super__.constructor.apply(this, arguments);
    }

    Server.prototype.http_port = 8080;

    Server.prototype.base_path = "contents/web/";

    Server.prototype.http = require("http");

    Server.prototype.mime = require('mime');

    Server.prototype.sio = require('socket.io');

    Server.prototype.fs = require("fs");

    Server.prototype.start = function(security) {
      if (security == null) {
        security = false;
      }
      this.ws_start();
      return this.http.createServer((function(_this) {
        return function(req, res) {
          return _this.http_server_action(req, res);
        };
      })(this)).listen(this.http_port);
    };

    Server.prototype.http_server_action = function(req, res) {
      var data, date, exists_flag, ip, params, path, type, url;
      url = req.url.replace(/\/{2,}/, "/");
      params = this.get_params(url);
      url = url.replace(/\?.*$/, "");
      if (url[url.length - 1] === "/") {
        url += "index.html";
      }

      /*get file */
      path = "" + this.base_path + url;
      exists_flag = this.fs.existsSync(path);
      if (exists_flag) {
        data = this.fs.readFileSync(path);
        type = this.mime.lookup(path);
        res.writeHead(200, {
          "Content-Type": type
        });
        res.end(data);
      } else {
        res.writeHead(404);
        res.end("404 - file not found");
      }

      /*access log */
      if (url.slice(url.length - 4, +(url.length - 1) + 1 || 9e9) === "html") {
        ip = req.connection.remoteAddress.replace(/.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1");
        date = new Date().toLocaleTimeString();
        return console.log(date + " " + ip + " " + url);
      }
    };

    Server.prototype.ws_start = function() {
      this.websocket = this.sio(this.ws_port);
      return this.websocket.on("connection", (function(_this) {
        return function(socket) {
          return socket.on("g", function(files, path) {
            return _this.ws_reload(socket, files);
          });
        };
      })(this));
    };

    Server.prototype.ws_reload = function(socket, files, path) {
      var file, filepath, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        filepath = "" + this.base_path + file;
        if (this.fs.existsSync(filepath)) {
          _results.push(this.fs.watch(filepath, (function(_this) {
            return function() {
              return socket.emit("reload");
            };
          })(this)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Server;

  })(this.CommonJsAroundProtocol);

  this.NodeJsApp = (function() {
    function NodeJsApp() {}

    NodeJsApp.prototype.http = require("http");

    NodeJsApp.prototype.https = require("https");

    NodeJsApp.prototype.fs = require("fs");

    NodeJsApp.prototype.cson = require("cson");

    NodeJsApp.prototype.server = new Server;

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

    NodeJsApp.prototype.check_dir_tree = function(dir, callback) {
      if (callback == null) {
        callback = void 0;
      }
      if (callback) {
        this.check_dir_tree_callback = callback;
      }
      return this.check_dir_tree_read_dir(dir);
    };

    NodeJsApp.prototype.check_dir_tree_callback = function() {
      return 1;
    };

    NodeJsApp.prototype.check_dir_tree_read_dir = function(dir) {
      var file, files, loc, _i, _len, _results;
      files = this.fs.readdirSync(dir);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        loc = "" + dir + file;
        if (this.fs.lstatSync(loc).isDirectory()) {
          _results.push(this.check_dir_tree_read_dir("" + dir + file + "/"));
        } else {
          _results.push(this.check_dir_tree_callback(loc, file));
        }
      }
      return _results;
    };

    return NodeJsApp;

  })();

  1;

}).call(this);

 //# sourceMappingURL=NodeJsApp.js.map