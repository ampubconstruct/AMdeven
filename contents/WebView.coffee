###
2015/02/11: goBackを使うと、wvが使えなくなる模様
###

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
	set_event: -> #es.webview.send("keydown", "#gbqfq", 97)
		@ipc.on "keydown", (selector, keyCode) => @set_keydown_event(selector, keyCode)
		@ipc.on "mousedown", (ratio = 0.5, selector = "body") => @jq(selector).css("transform", "scale(#{ratio}, #{ratio})")
		@ipc.on "set scale", (ratio = 0.5, selector = "body") => @jq(selector).css("transform", "scale(#{ratio}, #{ratio})")
	set_keydown_event: (selector, keyCode) ->
		@jq(selector).focus()
		e = @jq.Event("keypress")
		e.which = keyCode
		@jq(selector).val(@jq(selector).val() + String.fromCharCode(e.which))
		@jq(selector).trigger(e)
	start: ->
		1


#

class Crawler extends WebView
	set_event: ->
		super()
		@crawler_event()
	crawler_event: ->
		#

eval "wv = new Crawler();"
wv.set_event()
console.log "webview preload finished"
