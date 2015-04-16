
/* memo
    必須機能：
        他オブジェクトの内容をたどれる
        インデントでの折り返しが出来る
        テキストをそのまま編集したものがオブジェクトになる。
        軽量を意識する（不被強なDOMは使わない）
 */

(function() {
  var check_log, flaw_arr, indent, server;

  server = {
    enter_room: (function(_this) {
      return function(type) {
        return ["socket.idからユーザーを取得する", "部屋にユーザーを" + type + "として追加する"];
      };
    })(this)
  };

  flaw_arr = [
    "login", "enter lobby", {
      "enter room(type)": [
        {
          "if type is player": ["対局をする心の準備があるか確認", server.enter_room("player")],
          "if type is spectator": ["対局を見る心の準備があるか確認", server.enter_room("spectator")]
        }, "サーバーにtypeを送信"
      ]
    }, "logout #login後どこでも出来るのはどうする？", "disconnect"
  ];

  indent = "  ";

  check_log = function(val, recursive) {
    var arr_val, i, key, obj_val, tmp_indent, val_type, ___i, _i, _j, _len, _results, _results1;
    val_type = typeof val;
    switch (val_type) {
      case "object":
        switch (Array.isArray(val)) {
          case true:
            _results = [];
            for (i = _i = 0, _len = val.length; _i < _len; i = ++_i) {
              arr_val = val[i];
              _results.push(check_log(arr_val, recursive + 1));
            }
            return _results;
            break;
          default:
            _results1 = [];
            for (key in val) {
              obj_val = val[key];
              check_log(key, recursive);
              _results1.push(check_log(obj_val, recursive));
            }
            return _results1;
        }
        break;
      case "function":
        return 1;
      default:
        tmp_indent = "";
        if (recursive > 0) {
          for (___i = _j = 1; 1 <= recursive ? _j <= recursive : _j >= recursive; ___i = 1 <= recursive ? ++_j : --_j) {
            tmp_indent += indent;
          }
        }
        return console.log("" + tmp_indent + val);
    }
  };

  check_log(flaw_arr, -1);

}).call(this);

 //# sourceMappingURL=wordflaw.js.map