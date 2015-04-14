### memo
    必須機能：
        他オブジェクトの内容をたどれる
        
####

flaw_arr = [
    "login"
    "enter lobby"
    "enter room": [
        "switch type"
        [
            "player": [
                "対局をする心の準備があるか確認"
            ]
            "spectator": [
                "対局を見る心の準備があるか確認"
            ]
        ]
        "サーバーにtypeを送信"
    ]
    "logout #login後どこでも出来るのはどうする？"
    "disconnect"
]
indent = "  "

check_log = (val, recursive) ->
    if typeof(val) is "object"
        switch Array.isArray(val)
            when true
                check_log(arr_val, recursive+1) for arr_val, i in val
            else
                for key, obj_val of val
                    check_log(key, recursive) 
                    check_log(obj_val, recursive) 
    else
        tmp_indent = ""
        if recursive > 0
            for ___i in [1..recursive]
                tmp_indent += indent
        console.log "#{tmp_indent}#{val}"
        
check_log(flaw_arr, -1)
