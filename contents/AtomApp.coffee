ProjApp = require("./proj/ProjApp.js")

class ExternalSite
	###
		document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
		how to use:
			@es = new @ExternalSite "#foo"
		console:
			es.exejs("ipc.sendToHost('test',[1,2,3])")
	###
	webview: 0
	ready_flag: 0
	constructor: (@selector, @dom, @src, which = "append", @width = "100%", @height = "640px") ->
		webview = """
			<webview id="#{@selector}" preload="./webview.js" src="#{@src}"
				style="width:#{@width}; height:#{@height}; display: block; overflow: hidden;" nodeintegration>
			</webview>
		"""
		@$webview = $(webview)
		@webview = @$webview[0]
		$(@dom)[which](@webview)
		@webview_event()
		@$webview.on("did-finish-load", @finish)
		@$webview.on("new-window", (e) => @exejs("location.href = '#{e.url}'"))
	webview_event: ->
		@$webview.on("console-message", (e) => console.log "%c#{e.originalEvent.message}", "color: green")
		@$webview.on("ipc-message", (e) => console.log "%c#{e.channel} #{e.args}", "color: purple")
	#load終了後
	finish: =>
		++@ready_flag
		console.log "webview ready"
	exejs: (code) ->
		@webview.executeJavaScript code
		#console.log code
		1
	test: ->
		code = 'document.querySelector("#gbqfq").value = "tarou";'
		@webview.executeJavaScript code


class @AtomApp extends ProjApp
	reload_: 1
	inspector_: 1
	es: ExternalSite
	#module
	ipc: require "ipc"
	shell: require "shell"
	constructor: ->
		@init()
	init: -> 1
	start: ->
		if @inspector_ then @auto_inspector()
	auto_inspector: ->
		#
		$(document).on "mousedown", (e) =>
			if e.button is 2
				obj =
					x: e.clientX
					y: e.clientY
				@ipc.send('inspect element', obj, "mainWindow")


module.exports = @AtomApp
