$ =>
	@aa = new @AtomApp
	@aa.start()
	@aa.server.start()
	#@aa.check_dir_tree("./", (loc, file) => console.log file)
	@es = new @ExternalSite "#foo"

1







1