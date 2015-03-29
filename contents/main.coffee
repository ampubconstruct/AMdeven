
code = =>
	###nodejs app start###
	@App = require("./nodejs/App.js")
	@a = new @App()
	@a.server.start()
	###atom app start###
	@AtomApp = require("./AtomApp.js")
	@aa = new @AtomApp
	@aa.start()
	@aa.server.start() #http server, and websocket reload server
	###add function###
	###external site###
	@es = new @aa.es("#foo") #inner webview
	###check directory tree###
	@aa.check_dir_tree("./", /coffee$/, (loc_file, file) => console.log loc_file)
