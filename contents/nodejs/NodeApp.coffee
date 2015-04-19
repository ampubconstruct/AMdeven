#required CommonJs
CommonJs = require("../web/mylib/CommonJs.js")

class Server extends CommonJs
	#config
	base_path: "contents/web/"
	#module
	http: require("http")
	mime: require('mime')
	sio: require('socket.io')
	fs: require("fs")
	start: (security = false) ->
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
		path = "#{@base_path}#{url}"
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
			console.log "#{date} #{ip} #{url}"
	ws_start: ->
		if @ws_port is @http_port
			@websocket = @sio(@app)
		else
			@websocket = @sio(@ws_port)
		@app.listen(@http_port)
		@websocket.on "connection", (socket) =>
			socket.on "g", (files, path) => @ws_reload(socket, files)
	ws_reload: (socket, files, path) ->
		for file in files
			filepath = "#{@base_path}#{file}"
			if @fs.existsSync(filepath) then @fs.watch filepath, => socket.emit "reload"


class Compiler
	fs: require("fs")
	gaze: require("gaze")
	exec: require('child_process').exec
	sass: require("node-sass")
	constructor: (@parent) ->
		@check_dir_tree()
	check_dir_tree: =>
		me = @
		@gaze("**/*.coffee", (err, watcher) ->
			@on("changed", (filepath) =>
				me.exec("node ./node_modules/coffee-script/bin/coffee -m #{filepath}", (error, stdout, stderr) =>
					if error then console.log(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
					else console.log(stdout)
				)
			)
		)
		@gaze("**/*.sass", (err, watcher) ->
			@on("changed", (filepath) =>
				console.log filepath, "sass"
				me.sass.render(
					file: filepath
				, (err, result) =>
					console.log err
					console.log result
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
	jsdom_jquery_source: "./contents/web/lib/jquery-2.1.3.min.js"
	ignore_regexp: /(\/node_modules\/)|(\/\.git\/)/
	constructor: ->
		@server = new Server()
		@compiler = new Compiler(@)
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
