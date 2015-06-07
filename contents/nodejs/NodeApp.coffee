#required CommonJs
CommonJs = require("../proj/web/mylib/CommonJs.js")
Config = require("../../Config.js")

class Server extends CommonJs
  #config
  proj_path: "contents/proj/web"
  #module
  http: require("http")
  mime: require('mime')
  sio: require('socket.io')
  fs: require("fs")
  gaze: require("gaze")
  #info
  reload_list: []
  start: (@http_port = @http_port, @ws_port = @ws_port)->
    @app = @http.createServer((req, res) => @http_server_action(req, res))
    @ws_start()
  http_server_action: (req, res) ->
    #initial
    url = req.url.replace(/\/{2,}/, "/")
    params = @get_params url
    #modify
    url = url.replace(/\?.*$/, "")
    if url[url.length-1] is "/" then url += "index.html"
    ###get file###
    # set path
    path = "#{@proj_path}#{url}"
    # send data
    exists_flag = @fs.existsSync(path)
    if exists_flag
      data = @fs.readFileSync(path)
      type = @mime.lookup path
      res.writeHead(200, "Content-Type": type)
      res.end(data)
    else
      res.writeHead(404)
      res.end("404 - file not found")
    ###access log###
    if url[url.length-4..url.length-1] is "html"
      ip = req.connection.remoteAddress.replace(/.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1")
      date = new Date().toLocaleTimeString()
      console.log "#{date} #{ip} #{path}"
  ws_start: ->
    if @ws_port is @http_port
      @websocket = @sio(@app)
    else
      @websocket = @sio(@ws_port)
    @app.listen(@http_port)
    @websocket.on("connection", (socket) =>
      socket.on("all",=>@reload_list.push(socket))
    )
    @ws_event_reload()
  ws_event_reload: ->
    me = @
    dir = [
      "#{@proj_path}/**/*.js"
      "#{@proj_path}/**/*.html"
    ]
    @gaze(dir, (err, watcher) ->
      @on("changed", (filepath) =>
        me.check_reload_list()
        me.send_reload_event(socket) for socket in me.reload_list
      )
    )
    css_dir = [
      "#{@proj_path}**/*.css"
    ]
    @gaze(css_dir, (err, watcher) ->
      @on("changed", (filepath) =>
        me.check_reload_list()
        me.send_css_reload_event(socket, filepath) for socket in me.reload_list
      )
    )
  send_reload_event: (socket) => socket.emit("reload")
  send_css_reload_event: (socket,filepath) => socket.emit("css reload", @fs.readFileSync(filepath, {encoding:"utf-8"}))
  check_reload_list: =>
    arr = []
    for socket, i in @reload_list
      if socket.disconnected then arr.unshift(i)
    for num in arr
      @reload_list.splice(num, 1)

class @NodeApp
  ### modules ###
  http: require("http")
  https: require("https")
  fs: require("fs")
  cson: require("cson")
  Client: require('ftp')
  readline: require("readline")
  jsdom: require("jsdom")
  ### class ###
  Server: Server
  ### confing ###
  jsdom_jquery_source: "./contents/proj/web/lib/jquery-2.1.3.min.js" #sprintf検討
  ignore_regexp: /(\/node_modules\/)|(\/\.git\/)/
  config: new Config
  config_cson: {}
  constructor: (start=true)->
    if start then @init()
  init: ->
    @server = new @Server()
    ### config ###
    try
      result = @cson.load(@config.node_config_path)
    catch e
      result =
        server: true
      @fs.mkdir(@config.ignore_data_dir,=>@fs.writeFile(@config.node_config_path, @cson.createCSONString(result)))
    @config_cson = result
    if @config_cson.server then @server.start() #http server, and websocket reload server, default sart
  ### library ###
  csv_to_json: (columns, csv_file, callback) =>
    require("csv-to-array")(
      file: csv_file
      columns: columns
    , callback)
  jsdom_check: (file, callback) =>
    if not @jquery then @jquery = @fs.readFileSync(@jsdom_jquery_source, {encoding: "utf-8"})
    @jsdom.env(
      file: file
      src: [@jquery]
      done: callback
    )
  ftp_downloader: (user, pass, file, host, filepath) =>
    c = new @Client()
    c.on "ready", =>
      c.get "#{file}", (err, stream) =>
        throw err if err
        stream.once "close", =>
          c.end()
        stream.pipe @fs.createWriteStream(filepath)
    c.connect
      host: host
      user: user
      password: pass
  readline_func: (path, callback) =>
    rs = @fs.ReadStream(path)
    rl = @readline.createInterface({'input': rs, 'output': {}})
    rl.on("line", callback)
    rl.resume()
  ftp_downloader_fullpath: (url, filepath) =>
    name = url.replace(/.*\/\/([^:]+).*/, "$1")
    pass = url.replace(/.*\/\/[^:]+:([^@]+).*/, "$1")
    file = url.replace(/.*\/([^/]+$)/, "$1")
    host = url.replace(/.*@([^/]+).*/, "$1")
    @ftp_downloader(name, pass, file, host, filepath)
  downloader: (url, filepath) => #http, httpsに対応
    file = @fs.createWriteStream(filepath)
    protocol = if url.match(/^https/) then @https else @http
    request = protocol.get(url, (response) => response.pipe(file))
  check_dir_tree: (dir, pattern, callback) =>
    files = @fs.readdirSync(dir)
    for file in files
      loc = "#{dir}#{file}"
      if loc.match(@ignore_regexp) then continue
      if @fs.lstatSync(loc).isDirectory()
        @check_dir_tree("#{dir}#{file}/", pattern, callback)
      else
        unless file.match(pattern) then continue
        callback(loc, file)


module.exports = @NodeApp
