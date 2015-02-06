#required @CommonJs

class Server extends @CommonJsAroundProtocol
	#config
	http_port: 8080
	base_path: "contents/web/"
	#module
	http: require("http")
	mime: require('mime')
	sio: require('socket.io')
	fs: require("fs")
	start: (security = false) ->
		@ws_start()
		@http.createServer((req, res) => @http_server_action(req, res)).listen(@http_port)
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
			res.writeHead 200, "Content-Type": type
			res.end(data)
		else
			res.writeHead 404
			res.end("404 - file not found")
		###access log###
		if url[url.length-4..url.length-1] is "html"
			ip = req.connection.remoteAddress.replace /.*[^\d](\d+\.\d+\.\d+\.\d+$)/, "$1"
			date = new Date().toLocaleTimeString()
			console.log "#{date} #{ip} #{url}" 
	ws_start: ->
		@websocket = @sio(@ws_port)
		@websocket.on "connection", (socket) =>
			socket.on "g", (files, path) => @ws_reload(socket, files)
	ws_reload: (socket, files, path) ->
		for file in files
			filepath = "#{@base_path}#{file}"
			if @fs.existsSync(filepath) then @fs.watch filepath, => socket.emit "reload"


class @NodeJsApp
	http: require "http"
	https: require "https"
	fs: require "fs"
	server: new Server
	downloader: (url, filepath) -> #http, httpsに対応
		file = @fs.createWriteStream(filepath)
		protocol = if url.match /^https/ then @https else @http
		request = protocol.get url, (response) => response.pipe(file)
	check_dir_tree: (dir, callback = (filename) => 1) ->
		@check_dir_tree_read_dir(dir)
	check_dir_tree_read_dir: (dir) ->
		files = @fs.readdirSync(dir)
		for file in files
			if @fs.lstatSync("#{dir}#{file}").isDirectory()
				@check_dir_tree_read_dir "#{dir}#{file}/"
				console.log file

1