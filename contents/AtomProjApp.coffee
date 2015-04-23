AtomApp = require("./AtomApp.js")
class @AtomProjApp extends AtomApp
	constructor: ->
		super()
		@start()
	start: ->
		console.log "atom proj start"

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
	)
	#check directory tree
	@check_dir_tree("./", /coffee$/, (loc, file) => console.log loc)

	### atom app function ###
	#external site
	new @es("#foo", "body", "http://google.com", "prepend", "80%", "500px") #WebView.coffee

module.exports = @AtomProjApp
