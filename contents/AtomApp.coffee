class @AtomApp
	reload_: 1
	constructor: ->
		@init()
	init: ->
		@fs = require "fs"
	start: ->
		if @reload_ then @auto_reload()
	auto_reload: ->
		@fs.watch "contents", (e, filename) =>
			if filename.match /\.(html)|(js)|(css)$/
				location.reload()
			else
				1
$ =>
	@aa = new @AtomApp
	aa.start()
	