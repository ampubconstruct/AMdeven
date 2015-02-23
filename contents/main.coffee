$ =>
	###required###
	@aa = new @AtomApp
	@aa.start()


test = =>
	###add function###
	@aa.server.start() #http server, and websocket reload server
	###external site###
	@es = new @ExternalSite "#foo" #inner webview
	###check directory tree###
	@aa.check_dir_tree("./", /coffee$/, (loc_file, file) => console.log loc_file)
