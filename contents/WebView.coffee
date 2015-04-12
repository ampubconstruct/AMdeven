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
	set_event: ->
		@ipc.on "keydown", (selector, keyCode) => @set_keydown_event(selector, keyCode) #es.webview.send("keydown", "input[aria-label=検索]", 97)
		@ipc.on "mouseclick", (selector = "button") => @jq(selector).click() #es.webview.send("mouseclick", "button[aria-label='Google 検索']")
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

@wv = new Crawler()
@wv.set_event()
console.log "webview preload finished"
