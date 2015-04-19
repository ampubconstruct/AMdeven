// Generated by CoffeeScript 1.9.2

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
          "if type is player": ["対局をする", server.enter_room("player")],
          "if type is spectator": ["対局を見る", server.enter_room("spectator")]
        }, "サーバーにtypeを送信"
      ]
    }, "logout #login後どこでも出来るのはどうする？", "disconnect"
  ];

  indent = "  ";

  check_log = function(val, recursive) {
    var ___i, arr_val, i, j, k, key, len, obj_val, ref, results, results1, tmp_indent, val_type;
    val_type = typeof val;
    switch (val_type) {
      case "object":
        switch (Array.isArray(val)) {
          case true:
            results = [];
            for (i = j = 0, len = val.length; j < len; i = ++j) {
              arr_val = val[i];
              results.push(check_log(arr_val, recursive + 1));
            }
            return results;
            break;
          default:
            results1 = [];
            for (key in val) {
              obj_val = val[key];
              check_log(key, recursive);
              results1.push(check_log(obj_val, recursive));
            }
            return results1;
        }
        break;
      case "function":
        return 1;
      default:
        tmp_indent = "";
        if (recursive > 0) {
          for (___i = k = 1, ref = recursive; 1 <= ref ? k <= ref : k >= ref; ___i = 1 <= ref ? ++k : --k) {
            tmp_indent += indent;
          }
        }
        return console.log("" + tmp_indent + val);
    }
  };

  check_log(flaw_arr, -1);

}).call(this);

//# sourceMappingURL=wordflaw.js.map
