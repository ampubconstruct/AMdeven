start = =>
	b = new @Browser()
	b.start()

class @Browser# extends @NodeJsApp
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
		result = @cson.load("./browser.cson")
		@[key] = val for key, val of result
	start: ->
		require("crash-reporter").start()
		@ipc_event()
		@app_start()
		@live_reload()
	ipc_event: ->
		@ipc.on 'inspect element', (event, arg, renderer) =>
			#event.sender.send 'asynchronous-reply', 'pong')
			@[renderer].inspectElement(arg.x, arg.y)
	app_start: ->
		@app.on("window-all-closed", =>
			@app.quit() unless process.platform is "darwin"
		)
		@app.on("ready", =>
			@make_window()
			@etc()
		)
	live_reload: ->
		@fs.watch "contents", (e, filename) =>
			if not filename then return
			if filename.match /\.(html)|(js)|(css)$/
				@mainWindow.reload()
		@fs.watch "contents/nodejs", (e, filename) =>
			if not filename then return
			if filename.match /\.(html)|(js)|(css)$/
				@mainWindow.reload()
	make_window: ->
		@mainWindow = new @BrowserWindow(
			x: @x
			y: @y
			width: @width
			height: @height
			#show: (false)
		)
		@mainWindow.webContents.on("did-finish-load", => console.log "load finished.")
		@mainWindow.loadUrl(@url)
		@mainWindow.openDevTools()
		@mainWindow.on("close", (e) =>
			xy = @mainWindow.getPosition()
			wh = @mainWindow.getSize()
			obj = @cson.load @cson_path
			obj.x = xy[0]
			obj.y = xy[1]
			obj.width = wh[0]
			obj.height = wh[1]
			cson_string = @cson.createCSONString obj
			@fs.writeFileSync @cson_path, cson_string
			@mainWindow = (null)
		)
	global_shortcut: ->
			ret = @globalShortcut.register('ctrl+e', =>
				console.log("#{Date.now()} , ctrl+e is pressed")
			)
	etc: ->
		@global_shortcut()

start()










1
