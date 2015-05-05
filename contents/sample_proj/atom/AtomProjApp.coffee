AtomApp = require("../../AtomApp.js")
class @AtomProjApp extends AtomApp
	constructor: ->
		super()
		@start()
	start: ->
		console.log "atom proj start"
		@server.start() #http server, and websocket reload server

sample_code = ->
	### nodejs function ###
	@server.start() #http server, and websocket reload server
	#csv to json
	@csv_to_json([0..5], "./data/test.csv", (err, arr) => console.log arr)
	#readline
	@readline_func("./contents/index.html", (line) => console.log line)
	#jsdom
	@jsdom_check("./contents/index.html", (errors, _window) =>
		if errors then throw errors
		dom = _window.$("title")
		word = ""
		dom.each( (e) ->
			word += $(@).text() + "\n"
		)
		console.log word
		_window.close()
	)
	#check directory tree
	@check_dir_tree("./", /coffee$/, (loc, file) => console.log loc)

	### atom app function ###
	#external site
	@renderer = new @ExternalSite("#foo", "body", "http://google.com", "prepend", "90%", "400px") #WebView.coffee
	@renderer.$webview.off("console-message")
	@renderer.$webview.on("console-message", (e) => console.log "%c#{e.originalEvent.message}", "color: purple")
	@renderer.$webview.on("did-finish-load", =>
		@renderer.webview.send("set val", "input[aria-label=検索]", "DragonBall ")
		@renderer.webview.send("keydown", "input[aria-label=検索]", 90)
		setTimeout( =>
			@renderer.webview.send("mouseclick", "button[aria-label='Google 検索']")
			@renderer.webview.send("css", "body", "transform", "scale(0.8, 0.8)")
		, 1500)
	)

	### web app function ###
	# auto event

module.exports = @AtomProjApp
