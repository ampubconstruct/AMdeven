
/* memo
    必須機能：
        他オブジェクトの内容をたどれる
 */

(function() {
  var check_log, flaw_arr, indent;

  flaw_arr = [
    "login", "enter lobby", {
      "enter room": [
        "switch type", [
          {
            "player": ["対局をする心の準備があるか確認"],
            "spectator": ["対局を見る心の準備があるか確認"]
          }
        ], "サーバーにtypeを送信"
      ]
    }, "logout #login後どこでも出来るのはどうする？", "disconnect"
  ];

  indent = "  ";

  check_log = function(val, recursive) {
    var arr_val, i, key, obj_val, tmp_indent, ___i, _i, _j, _len, _results, _results1;
    if (typeof val === "object") {
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
    } else {
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