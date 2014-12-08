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
			if @reload_
				if filename.match /\.coffee$/
					1
				else
					location.reload()
$ =>
	@aa = new @AtomApp
	aa.start()