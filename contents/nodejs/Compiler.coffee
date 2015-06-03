CompilerSrc = require("./CompilerSrc")

class Compiler extends CompilerSrc
  fs: require("fs")
  gaze: require("gaze")
  babel: require("babel")
  exec: require('child_process').exec
  constructor: ->
    @watch()
  watch_babel: =>
    me = @
    @gaze(["*.es6", "contents/**/*.es6"], (err, watcher) ->
      @on("changed", me.compile_babel)
      )
    me.log "Compiler, babel#{@babel.version}"
  watch_coffee: =>
    me = @
    yield @exec("node ./node_modules/coffee-script/bin/coffee -v",(e,stdout,stderr) =>
      if e then return @log(e.message)
      @log "Compiler, #{stdout}"
      @watch_coffee_gen.next()
    )
    @gaze(["*.coffee", "contents/**/*.coffee"], (err, watcher) ->
      @on("changed", me.compile_coffee)
    )
  watch_sass: =>
    me = @
    yield @exec("sass -v",(e,stdout,stderr) =>
      if e then return
      @log "Compiler, #{stdout}"
      @watch_sass_gen.next()
    )
    @gaze(["*.sass", "contents/**/*.sass"], (err, watcher) ->
      @on("changed", me.compile_sass)
      )
  watch: =>
    @watch_coffee_gen = @watch_coffee()
    @watch_coffee_gen.next()
    @watch_sass_gen = @watch_sass()
    @watch_sass_gen.next()
    @watch_babel_gen = @watch_babel()

new Compiler()
#module.exports = Compiler
