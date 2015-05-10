class Compiler
	fs: require("fs")
	gaze: require("gaze")
	exec: require('child_process').exec
	constructor: ->
    @watch()
		unless process.send? then process.send = console.log
  watch: =>
    me = @
    @gaze(["*.coffee", "**/*.coffee"], (err, watcher) ->
      @on("changed", (filepath) =>
        command = "node ./node_modules/coffee-script/bin/coffee -mc #{filepath}"
        me.exec(command, (error, stdout, stderr) =>
          if error then process.send(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
          else 1 #process.send(String(stdout))
        )
      )
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

new Compiler()
#module.exports = Compiler
