class Compiler
	fs: require("fs")
	gaze: require("gaze")
	exec: require('child_process').exec
	constructor: ->
		@watch()
		unless process.send? then process.send = console.log
	watch_coffee: =>
		me = @
		yield @exec("coffee -v",(e,stdout,stderr) =>
			if e then return
			process.send "Compiler, #{stdout}"
			@watch_coffee_gen.next()
		)
		@gaze(["*.coffee", "**/*.coffee"], (err, watcher) ->
			@on("changed", (filepath) =>
				command = "iojs ./node_modules/coffee-script/bin/coffee -mc #{filepath}"
				me.exec(command, (error, stdout, stderr) =>
					if error then process.send(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
					else 1 #process.send(String(stdout))
				)
			)
		)
	watch_sass: =>
		me = @
		yield @exec("sass -v",(e,stdout,stderr) =>
			if e then return
			process.send "Compiler, #{stdout}"
			@watch_sass_gen.next()
		)
		@gaze(["*.sass", "**/*.sass"], (err, watcher) ->
			@on("changed", (filepath) =>
				command = "sass #{filepath}"
				me.exec(command, (error, stdout, stderr) =>
					if error
						process.send(stderr)
						return
					else
						command = "sass #{filepath} #{filepath.replace(/sass$/, 'css')}"
						me.exec(command)
					)
				)
			)
	watch: =>
		@watch_coffee_gen = @watch_coffee()
		@watch_coffee_gen.next()
		@watch_sass_gen = @watch_sass()
		@watch_sass_gen.next()

new Compiler()
#module.exports = Compiler
