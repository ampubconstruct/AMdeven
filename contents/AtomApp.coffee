$ =>
	#@aa = new @AtomApp
	@aa = new @CrossRendererApp
	
	#
	aa.start()

class @AtomApp
	reload_: 1
	inspector_: 1
	constructor: ->
		@init()
	init: ->
		@fs = require "fs"
		@ipc = require "ipc"
	start: ->
		if @reload_ then @auto_reload()
		if @inspector_ then @auto_inspector()
	auto_reload: ->
		@fs.watch "contents", (e, filename) =>
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
class @CrossRendererApp extends @AtomApp
	start: ->
		super()
		#@set_ipcEvent_for_external_site()
		@set_browser_event()
	send: (data) ->
		@ipc.send "send_browser", data
	send_renderer: (data = {}, renderer = "subWindow") ->
		@ipc.send "send_renderer_via_browser", data, renderer
	execute_renderer: (code = "console.log(123);", renderer = "subWindow") ->
		@ipc.send "execute_renderer", code, renderer
	set_ipcEvent_for_external_site: (renderer = "subWindow") ->
		@execute_renderer """
			if (typeof ___ipc === "undefined" || ___ipc === null) {
				window.___ipc = require('ipc'); 
				___ipc.on('via_browser', function(data) {console.log(data);})
			}
		""", renderer
	set_browser_event: ->
		@ipc.on "send_renderer_from_browser", (data) =>
			console.log data
	
		