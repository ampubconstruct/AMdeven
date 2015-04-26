#required CommonJs
CommonJs = require("../web/mylib/CommonJs.js")

class Server extends CommonJs
	#config
	base_path: "contents/web/"
	proj_path: "contents/proj/"
	#module
	http: require("http")
	mime: require('mime')
	sio: require('socket.io')
	fs: require("fs")
	gaze: require("gaze")
	start: (@http_port = @http_port, @ws_port = @ws_port)->
		@app = @http.createServer((req, res) => @http_server_action(req, res))
		@ws_start()
	http_server_action: (req, res) ->
		#initial
		url = req.url.replace /\/{2,}/, "/"
		params = @get_params url
		#modify
		url = url.replace /\?.*$/, ""
		if url[url.length-1] is "/" then url += "index.html"
		###get file###
		# set path
		if url.match(/^\/web\//) then path = "#{@proj_path}#{url}"
		else path = "#{@base_path}#{url}"
		# send data
		exists_flag = @fs.existsSync path
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
			ip = req.connection.remoteAddress.replace /.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1"
			date = new Date().toLocaleTimeString()
			console.log "#{date} #{ip} #{path}"
	ws_start: ->
		if @ws_port is @http_port
			@websocket = @sio(@app)
		else
			@websocket = @sio(@ws_port)
		@app.listen(@http_port)
		@websocket.on("connection", (socket) =>
			socket.on("g", (paths) => @ws_reload(socket, paths))
			socket.on("all",(paths)=>@ws_all_reload(socket))
		)
	ws_reload: (socket, paths) ->
		for path in paths
			#modify
			if path.match(/^web\//) then path = "#{@proj_path}#{path}"
			else path = "#{@base_path}#{path}"
			if @fs.existsSync(path)
				@fs.watch(path, (error, filename) =>
					if filename.match(/\.coffee$|\.sass$/) then return
					socket.emit("reload")
				)
	ws_all_reload:(socket)->
		dir = [
			"#{@base_path}**/*.js"
			"#{@base_path}**/*.html"
			"#{@base_path}**/*.css"
			"#{@proj_path}**/*.js"
			"#{@proj_path}**/*.html"
			"#{@proj_path}**/*.css"
		]
		@gaze(dir, (err, watcher) ->
			@on("changed", (filepath) =>
				socket.emit("reload")
			)
		)

class Compiler
	fs: require("fs")
	gaze: require("gaze")
	exec: require('child_process').exec
	#sass: require("node-sass")
	constructor: (@parent) ->
		@check_dir_tree()
	check_dir_tree: =>
		me = @
		@gaze(["*.coffee", "contents/**/*.coffee"], (err, watcher) ->
			@on("changed", (filepath) =>
				command = "node ./node_modules/coffee-script/bin/coffee -mc #{filepath}"
				me.exec(command, (error, stdout, stderr) =>
					if error then console.log(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
					else console.log(stdout)
				)
			)
		)
		@gaze(["*.sass", "contents/**/*.sass"], (err, watcher) ->
			@on("changed", (filepath) =>
				command = "sass #{filepath}"# #{filepath.replace(/sass$/, 'css')}"
				console.log command
				me.exec(command, (error, stdout, stderr) =>
					if error
						console.log(stderr)
						return
					else
						command = "sass #{filepath} #{filepath.replace(/sass$/, 'css')}"
						me.exec(command)
				)
			)
		)

class @NodeApp
	http: require("http")
	https: require("https")
	fs: require("fs")
	cson: require("cson")
	Client: require('ftp')
	jsdom: require("jsdom")
	jsdom_jquery_source: "./contents/web/lib/jquery-2.1.3.min.js" #sprintf検討
	ignore_regexp: /(\/node_modules\/)|(\/\.git\/)/
	constructor: ->
		@server = new Server()
		@compiler = new Compiler(@)
		setTimeout( =>
			console.log("nodejs app stanby ok")
		, 10)
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
	readline: (path, callback) =>
		readline = require("readline")
		rs = @fs.ReadStream(path)
		rl = readline.createInterface({'input': rs, 'output': {}})
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
		protocol = if url.match /^https/ then @https else @http
		request = protocol.get url, (response) => response.pipe(file)
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
