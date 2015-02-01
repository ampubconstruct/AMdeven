class @NodeJsApp
	http: require "http"
	https: require "https"
	fs: require "fs"
	downloader: (url, filepath) ->
		file = @fs.createWriteStream(filepath)
		protocol = if url.match /^https/ then @https else @http
		request = protocol.get url, (response) => response.pipe(file)


class @Server
	#config
	http_port: 8080
	ws_port: 50000
	#module
	http: require("http")
	mime: require('mime')
	sio: require('socket.io')
	ws_start: ->
		@websocket = @sio.(@ws_port)
		@websocket.on "connection", (socket) =>
			socket.emit "first", {hello: "world"}
			
1