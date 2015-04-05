$ =>
	@AtomApp = require("./AtomApp.js")
	@aa = new @AtomApp()
	@aa.start()
	@aa.server.start() #http server, and websocket reload server

code = =>
	### add function ###
	#readline
	@aa.readline("./contents/index.html", (line) => console.log line)
	#jsdom
	@aa.jsdom_check("./contents/index.html", "title")
	#external site
	@es = new @aa.es("#foo", "body", "http://google.com", "prepend", "80%", "500px") #inner webview
	#check directory tree
	@aa.check_dir_tree("./", /coffee$/, (loc_file, file) => console.log loc_file)
