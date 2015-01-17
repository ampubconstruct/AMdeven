class WebView
	constructor: ->
		eval 'ipc = require("ipc")'
		eval 'fs = require("fs")'
		data = fs.readFileSync "./contents/jquery-2.0.3.min.js",
			encoding: "utf-8"
		eval data
		eval 'JQ = $;$ = null;jQuery = null;'
	set_event: ->
		ipc.on "keydown", (selector, keyCode) => #es.webview.send("keydown", "#gbqfq", 97)
			@set_keydown_event selector, keyCode
	set_keydown_event: (selector, keyCode) ->
		JQ(selector).focus()
		e = JQ.Event("keypress")
		e.which = keyCode
		JQ(selector).val(JQ(selector).val() + String.fromCharCode(e.which))
		JQ(selector).trigger(e)
#

eval "wv = new WebView();"
wv.set_event()
console.log "preload finished, webview"
