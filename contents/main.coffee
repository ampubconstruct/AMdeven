@AtomApp = require("./AtomApp.js")

$ =>
	###required###
	@aa = new @AtomApp
	@aa.start()
	@aa.server.start() #http server, and websocket reload server



test = =>
	###add function###
	###external site###
	@es = new @aa.es("#foo") #inner webview
	###check directory tree###
	@aa.check_dir_tree("./", /coffee$/, (loc_file, file) => console.log loc_file)
