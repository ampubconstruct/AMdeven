(function() {
  var CommonJs, Compiler, Server,
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

  Compiler = (function() {
    Compiler.prototype.fs = require("fs");

    Compiler.prototype.gaze = require("gaze");

    Compiler.prototype.exec = require('child_process').exec;

    Compiler.prototype.sass = require("node-sass");

    function Compiler(_at_parent) {
      this.parent = _at_parent;
      this.check_dir_tree = __bind(this.check_dir_tree, this);
      this.check_dir_tree();
    }

    Compiler.prototype.check_dir_tree = function() {
      var me;
      me = this;
      this.gaze("**/*.coffee", function(err, watcher) {
        return this.on("changed", (function(_this) {
          return function(filepath) {
            if (filepath.match("/node_modules/")) {
              return;
            }
            return me.exec("node ./node_modules/coffee-script/bin/coffee -m " + filepath, function(error, stdout, stderr) {
              if (error) {
                return console.log(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"));
              } else {
                return console.log(stdout);
              }
            });
          };
        })(this));
      });
      return this.gaze("**/*.sass", function(err, watcher) {
        return this.on("changed", (function(_this) {
          return function(filepath) {
            if (filepath.match("/node_modules/")) {
              return;
            }
            console.log(filepath, "sass");
            return me.sass.render({
              file: filepath
            }, function(err, result) {
              console.log(err);
              return console.log(result);
            });
          };
        })(this));
      });
    };

    return Compiler;

  })();

  this.NodeApp = (function() {
    NodeApp.prototype.http = require("http");

    NodeApp.prototype.https = require("https");

    NodeApp.prototype.fs = require("fs");

    NodeApp.prototype.cson = require("cson");

    NodeApp.prototype.Client = require('ftp');

    NodeApp.prototype.jsdom = require("jsdom");

    NodeApp.prototype.jsdom_jquery_source = "./contents/web/lib/jquery-2.1.3.min.js";

    NodeApp.prototype.ignore_regexp = /(\/node_modules\/)|(\/\.git\/)/;

    function NodeApp() {
      this.check_dir_tree = __bind(this.check_dir_tree, this);
      this.downloader = __bind(this.downloader, this);
      this.ftp_downloader_fullpath = __bind(this.ftp_downloader_fullpath, this);
      this.readline = __bind(this.readline, this);
      this.ftp_downloader = __bind(this.ftp_downloader, this);
      this.jsdom_check = __bind(this.jsdom_check, this);
      this.csv_to_json = __bind(this.csv_to_json, this);
      this.server = new Server();
      this.compiler = new Compiler(this);
    }

    NodeApp.prototype.csv_to_json = function(columns, csv_file, callback) {
      return require("csv-to-array")({
        file: csv_file,
        columns: columns
      }, callback);
    };

    NodeApp.prototype.jsdom_check = function(file, callback) {
      if (!this.jquery) {
        this.jquery = this.fs.readFileSync(this.jsdom_jquery_source, {
          encoding: "utf-8"
        });
      }
      return this.jsdom.env({
        file: file,
        src: [this.jquery],
        done: callback
      });
    };

    NodeApp.prototype.ftp_downloader = function(user, pass, file, host, filepath) {
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

    NodeApp.prototype.readline = function(path, callback) {
      var readline, rl, rs;
      readline = require("readline");
      rs = this.fs.ReadStream(path);
      rl = readline.createInterface({
        'input': rs,
        'output': {}
      });
      rl.on("line", callback);
      return rl.resume();
    };

    NodeApp.prototype.ftp_downloader_fullpath = function(url, filepath) {
      var file, host, name, pass;
      name = url.replace(/.*\/\/([^:]+).*/, "$1");
      pass = url.replace(/.*\/\/[^:]+:([^@]+).*/, "$1");
      file = url.replace(/.*\/([^/]+$)/, "$1");
      host = url.replace(/.*@([^/]+).*/, "$1");
      return this.ftp_downloader(name, pass, file, host, filepath);
    };

    NodeApp.prototype.downloader = function(url, filepath) {
      var file, protocol, request;
      file = this.fs.createWriteStream(filepath);
      protocol = url.match(/^https/) ? this.https : this.http;
      return request = protocol.get(url, (function(_this) {
        return function(response) {
          return response.pipe(file);
        };
      })(this));
    };

    NodeApp.prototype.check_dir_tree = function(dir, pattern, callback) {
      var file, files, loc, _i, _len, _results;
      files = this.fs.readdirSync(dir);
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        loc = "" + dir + file;
        if (loc.match(this.ignore_regexp)) {
          continue;
        }
        if (this.fs.lstatSync(loc).isDirectory()) {
          _results.push(this.check_dir_tree("" + dir + file + "/", pattern, callback));
        } else {
          if (!file.match(pattern)) {
            continue;
          }
          _results.push(callback(loc, file));
        }
      }
      return _results;
    };

    return NodeApp;

  })();

  module.exports = this.NodeApp;

}).call(this);

 //# sourceMappingURL=NodeApp.js.map