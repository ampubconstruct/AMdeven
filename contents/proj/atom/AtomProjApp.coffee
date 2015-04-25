AtomApp = require("../../AtomApp.js")
class @AtomProjApp extends AtomApp
	constructor: ->
		super()
		@start()
	start: ->
		console.log "atom proj start"
		@server.start() #http server, and websocket reload server
		### external site ###

sample_code = ->
	### nodejs function ###
	@server.start() #http server, and websocket reload server
	#csv to json
	@csv_to_json([0..5], "./data/test.csv", (err, arr) => console.log arr)
	#readline
	@readline("./contents/index.html", (line) => console.log line)
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
	@renderer = new @es("#foo", "body", "http://google.com", "prepend", "80%", "200px") #WebView.coffee
	@renderer.$webview.off("console-message")
	@renderer.$webview.on("console-message", (e) => console.log "%c#{e.originalEvent.message}", "color: red")
	@renderer.$webview.on("did-finish-load", =>
		@renderer.webview.send("keydown", "input[aria-label=検索]", 97)
		@renderer.webview.send("mouseclick", "button[aria-label='Google 検索']")
		@renderer.webview.send("set scale", ratio = 0.5, selector = "body")
	)


module.exports = @AtomProjApp
