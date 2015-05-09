class Compiler
	fs: require("fs")
	gaze: require("gaze")
	exec: require('child_process').exec
	#sass: require("node-sass")
	constructor: ->
    @watch()
  watch: =>
    me = @
    @gaze(["*.coffee", "**/*.coffee"], (err, watcher) ->
      @on("changed", (filepath) =>
        command = "node ./node_modules/coffee-script/bin/coffee -mc #{filepath}"
        me.exec(command, (error, stdout, stderr) =>
          if error then process.send(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
          else process.send(String(stdout))
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
