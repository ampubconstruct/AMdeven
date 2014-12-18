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
				@ipc.sendSync('inspect element', obj)
		#
		
		1
$ =>
	@aa = new @AtomApp
	aa.start()
	
	