$ =>
	@aa = new @AtomApp
	
	#
	aa.start()

class @AtomApp extends @NodeJsApp
	reload_: 1
	inspector_: 1
	#module
	ipc: require "ipc"
	shell: require "shell"
	constructor: ->
		@init()
	init: -> 1
	start: ->
		if @reload_ then @auto_reload()
		if @inspector_ then @auto_inspector()
	auto_reload: ->
		@fs.watch "contents", (e, filename) =>
			if not filename then return
			if filename.match /\.(html)|(js)|(css)$/
				location.reload()
			else
				1
	auto_inspector: ->
		#
		$(document).on "mousedown", (e) =>
			if e.button is 2
				obj =
					x: e.clientX
					y: e.clientY
				@ipc.send('inspect element', obj, "mainWindow")


class @ExternalSite
	###
		document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
		how to use:
			@es = new @ExternalSite "#foo"
		console:
			es.exejs("ipc.sendToHost('test',[1,2,3])")
	###
	webview: 0
	ready_flag: 0
	constructor: (@selector) ->
		@webview = document.querySelector(@selector)
		@webview_event()
		@webview.addEventListener("did-finish-load", @finish)
	webview_event: ->
		@webview.addEventListener "console-message", (event) =>
			console.log "%c#{event.message}", "color: green"
		@webview.addEventListener "ipc-message", (event) =>
			console.log "%c#{event.channel}", "color: purple"
			console.log "%c#{event.args}", "color: purple"
	#load終了後
	finish: =>
		++@ready_flag
	exejs: (code) ->
		@webview.executeJavaScript code
		#console.log code
		1
	test: ->
		code = 'document.querySelector("#gbqfq").value = "tarou";'
		@webview.executeJavaScript code















1