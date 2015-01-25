class @NodeJsApp
	http: require "http"
	https: require "https"
	fs: require "fs"
	downloader: (url, filepath) ->
		file = @fs.createWriteStream(filepath)
		protocol = if url.match /^https/ then @https else @http
		request = protocol.get url, (response) => response.pipe(file)


1