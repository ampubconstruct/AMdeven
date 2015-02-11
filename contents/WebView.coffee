class WebView
	ipc: require("ipc")
	fs: require("fs")
	shell: require("shell")
	jq: "./contents/web/lib/jquery-2.0.3.min.js"
	constructor: ->
		data = @fs.readFileSync @jq,
			encoding: "utf-8"
		eval data
		@jq = $
		eval '$ = null;jQuery = null;'
	set_event: ->
		@ipc.on "keydown", (selector, keyCode) => #es.webview.send("keydown", "#gbqfq", 97)
			@set_keydown_event selector, keyCode
	set_keydown_event: (selector, keyCode) ->
		@jq(selector).focus()
		e = @jq.Event("keypress")
		e.which = keyCode
		@jq(selector).val(@jq(selector).val() + String.fromCharCode(e.which))
		@jq(selector).trigger(e)
	start: ->
		@jq =>
			console.log "webview load finished"
			@jq("a").click (e) =>
				@shell.openExternal @jq("a").attr("href")
#

eval "wv = new WebView();"
wv.start()
wv.set_event()
console.log "webview preload finished"
