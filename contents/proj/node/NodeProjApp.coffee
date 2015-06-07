NodeApp = require("../../nodejs/NodeApp.js")

class @NodeProjApp extends NodeApp
  constructor: ->
    super()
    console.log "node proj start"

sample_code = ->
  ### nodejs function ###
  @server.start() #http server, and websocket reload server, default sart
  #csv to json
  @csv_to_json([0..5], "./data/test.csv", (err, arr) => console.log arr)
  #readline
  @readline_func("./contents/index.html", (line) => console.log line)
  #jsdom
  @jsdom_check("./contents/index.html", (errors, _window) =>
    if errors then throw errors
    dom = _window.$("title")
    word = ""
    dom.each( (e) ->
      word += $(@).text() + "\n"
      )
    console.log word
    #_window.close() #bug?
  )
  #check directory tree
  @check_dir_tree("./", /coffee$/, (loc, file) => console.log loc)



#new @NodeProjApp()
module.exports = @NodeProjApp
