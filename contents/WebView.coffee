###
2015/02/11: goBackを使うと、wvが使えなくなる模様
###
$ = require("./web/lib/jquery-2.1.3.min.js")
class WebView
	ipc: require("ipc")
	fs: require("fs")
	shell: require("shell")
	constructor: -> 1
	set_event: ->
		@ipc.on "keydown", (selector, keyCode) => @set_keydown_event(selector, keyCode)
		@ipc.on "mouseclick", (selector = "button") => $(selector).click()
		@ipc.on "set scale", (ratio = 0.5, selector = "body") => $(selector).css("transform", "scale(#{ratio}, #{ratio})")
	set_keydown_event: (selector, keyCode) ->
		$(selector).focus()
		e = $.Event("keypress")
		e.which = keyCode
		$(selector).val($(selector).val() + String.fromCharCode(e.which))
		$(selector).trigger(e)
	start: ->
		1

wv = new WebView()
wv.set_event()
console.log "webview preload finished"
