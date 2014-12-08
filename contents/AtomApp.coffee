class @AtomApp
	reload_: 1
	constructor: ->
		@init()
	init: ->
		@fs = require "fs"
	start: ->
		if @reload_ then @auto_reload()
	auto_reload: ->
		flag = (false)
		@fs.watch "contents", (e, filename) =>
			if @reload_ and not flag
				setTimeout =>
					flag = (true)
					location.reload()
				, 1000
$ =>
	@aa = new @AtomApp
	aa.start()