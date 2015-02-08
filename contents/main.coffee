$ =>
	###required###
	@aa = new @AtomApp
	@aa.start()
	###add function###
	@aa.server.start() #http server, and websocket reload server
	@es = new @ExternalSite "#foo" #inner webview



test = =>
	@aa.check_dir_tree("./", (loc, file) => console.log file)
