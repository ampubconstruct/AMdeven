class Compiler
  fs: require("fs")
  gaze: require("gaze")
  babel: require("babel")
  exec: require('child_process').exec
  constructor: ->
    @watch()
  log: (msg) ->
    console.log(msg)
    try
      process.send?(msg)
  watch_babel: =>
    me = @
    @gaze(["*.babel", "contents/**/*.babel"], (err, watcher) ->
      @on("changed", (filepath) =>
        me.babel.transformFile(filepath, (err, result) =>
          if err then me.log(err.message)
          else me.fs.writeFile(filepath.replace(/\.babel$/, ".js"), result.code)
          )
        )
      )
    me.log "Compiler, babel#{@babel.version}"
  watch_coffee: =>
    me = @
    yield @exec("coffee -v",(e,stdout,stderr) =>
      if e then return
      @log "Compiler, #{stdout}"
      @watch_coffee_gen.next()
    )
    @gaze(["*.coffee", "contents/**/*.coffee"], (err, watcher) ->
      @on("changed", (filepath) =>
        command = "iojs ./node_modules/coffee-script/bin/coffee -mc #{filepath}"
        me.exec(command, (error, stdout, stderr) =>
          if error then me.log(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
          else 1 #@log(String(stdout))
        )
      )
    )
  watch_sass: =>
    me = @
    yield @exec("sass -v",(e,stdout,stderr) =>
      if e then return
      @log "Compiler, #{stdout}"
      @watch_sass_gen.next()
    )
    @gaze(["*.sass", "contents/**/*.sass"], (err, watcher) ->
      @on("changed", (filepath) =>
        command = "sass #{filepath}"
        me.exec(command, (error, stdout, stderr) =>
          if error
            me.log(stderr)
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
    @watch_babel_gen = @watch_babel()

new Compiler()
#module.exports = Compiler
