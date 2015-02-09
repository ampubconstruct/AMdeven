start = =>
	b = new @Browser()
	b.start()
	p = new @Pipe()

class @Browser
	#configuration
	url: "file://" + __dirname + "/contents/index.html"
	cson_path: "./browser.cson"
	#require
	fs: require("fs")
	app: require("app")
	ipc: require("ipc")
	cson: require("cson")
	BrowserWindow: require("browser-window")
	globalShortcut: require('global-shortcut')
	shell: require("shell")
	#member
	mainWindow: 0
	constructor: ->
		result = @cson.load "./browser.cson"
		@[key] = val for key, val of result
	start: ->
		require("crash-reporter").start()
		@ipc_event()
		@app_start()
	ipc_event: ->
		@ipc.on 'inspect element', (event, arg, renderer) =>
			#event.sender.send 'asynchronous-reply', 'pong')
			@[renderer].inspectElement(arg.x, arg.y)
	app_start: ->
		@app.on "window-all-closed", =>
			@app.quit()  unless process.platform is "darwin"
		@app.on "ready", =>
			@make_window()
			@etc()
	make_window: ->
		@mainWindow = new @BrowserWindow(
			x: @x
			y: @y
			width: @width
			height: @height
			#show: (false)
		)
		@mainWindow.loadUrl @url
		@mainWindow.openDevTools()
		console.log
		@mainWindow.on "close", (e) =>
			xy = @mainWindow.getPosition()
			wh = @mainWindow.getSize()
			obj =
				x: xy[0]
				y: xy[1]
				width: wh[0]
				height: wh[1]
			cson_string = @cson.createCSONString obj
			@fs.writeFileSync @cson_path, cson_string
			@mainWindow = (null)
	global_shortcut: ->
			ret = @globalShortcut.register 'ctrl+e', =>
				console.log("#{Date.now()} , ctrl+e is pressed")
			1
	etc: ->
		@global_shortcut()
	1


class @Pipe
	constructor: ->
		process.stdin.setEncoding "utf8"
		process.stdin.on "readable", ->
			chunk = process.stdin.read()
			console.log chunk


start()










1
