(function() {
  var CommonJs, Server,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CommonJs = require("../web/mylib/CommonJs.js");

  Server = (function(_super) {
    __extends(Server, _super);

    function Server() {
      return Server.__super__.constructor.apply(this, arguments);
    }

    Server.prototype.base_path = "contents/web/";

    Server.prototype.http = require("http");

    Server.prototype.mime = require('mime');

    Server.prototype.sio = require('socket.io');

    Server.prototype.fs = require("fs");

    Server.prototype.start = function(security) {
      if (security == null) {
        security = false;
      }
      this.app = this.http.createServer((function(_this) {
        return function(req, res) {
          return _this.http_server_action(req, res);
        };
      })(this));
      return this.ws_start();
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
      if (this.ws_port === this.http_port) {
        this.websocket = this.sio(this.app);
      } else {
        this.websocket = this.sio(this.ws_port);
      }
      this.app.listen(this.http_port);
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

  })(CommonJs);

  this.App = (function() {
    function App() {
      this.check_dir_tree_read_dir = __bind(this.check_dir_tree_read_dir, this);
      this.check_dir_tree_callback = __bind(this.check_dir_tree_callback, this);
      this.check_dir_tree = __bind(this.check_dir_tree, this);
      this.downloader = __bind(this.downloader, this);
      this.ftp_downloader_fullpath = __bind(this.ftp_downloader_fullpath, this);
      this.readline = __bind(this.readline, this);
      this.ftp_downloader = __bind(this.ftp_downloader, this);
    }

    App.prototype.http = require("http");

    App.prototype.https = require("https");

    App.prototype.fs = require("fs");

    App.prototype.cson = require("cson");

    App.prototype.Client = require('ftp');

    App.prototype.server = new Server;

    App.prototype.ftp_downloader = function(user, pass, file, host, filepath) {
      var c;
      c = new this.Client();
      c.on("ready", (function(_this) {
        return function() {
          return c.get("" + file, function(err, stream) {
            if (err) {
              throw err;
            }
            stream.once("close", function() {
              return c.end();
            });
            return stream.pipe(_this.fs.createWriteStream(filepath));
          });
        };
      })(this));
      return c.connect({
        host: host,
        user: user,
        password: pass
      });
    };

    App.prototype.readline = function(path) {
      var readline, rl, rs;
      readline = require("readline");
      rs = this.fs.ReadStream(path);
      rl = readline.createInterface({
        'input': rs,
        'output': {}
      });
      rl.on("line", (function(_this) {
        return function(line) {
          return console.log(line);
        };
      })(this));
      return rl.resume();
    };

    App.prototype.ftp_downloader_fullpath = function(url, filepath) {
      var file, host, name, pass;
      name = url.replace(/.*\/\/([^:]+).*/, "$1");
      pass = url.replace(/.*\/\/[^:]+:([^@]+).*/, "$1");
      file = url.replace(/.*\/([^/]+$)/, "$1");
      host = url.replace(/.*@([^/]+).*/, "$1");
      return this.ftp_downloader(name, pass, file, host, filepath);
    };

    App.prototype.downloader = function(url, filepath) {
      var file, protocol, request;
      file = this.fs.createWriteStream(filepath);
      protocol = url.match(/^https/) ? this.https : this.http;
      return request = protocol.get(url, (function(_this) {
        return function(response) {
          return response.pipe(file);
        };
      })(this));
    };

    App.prototype.check_dir_tree = function(dir, _at_check_dir_tree_file_pattern, callback) {
      this.check_dir_tree_file_pattern = _at_check_dir_tree_file_pattern;
      if (callback == null) {
        callback = void 0;
      }
      if (callback) {
        this.check_dir_tree_callback = callback;
      }
      return this.check_dir_tree_read_dir(dir);
    };

    App.prototype.check_dir_tree_callback = function() {
      return 1;
    };

    App.prototype.check_dir_tree_read_dir = function(dir) {
      var file, files, loc, _i, _len, _results;
      files = this.fs.readdirSync(dir);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        loc = "" + dir + file;
        if (this.fs.lstatSync(loc).isDirectory()) {
          _results.push(this.check_dir_tree_read_dir("" + dir + file + "/"));
        } else {
          if (file.match(this.check_dir_tree_file_pattern)) {
            _results.push(this.check_dir_tree_callback(loc, file));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };

    return App;

  })();

  module.exports = this.App;

}).call(this);

 //# sourceMappingURL=App.js.map