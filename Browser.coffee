start = =>
	b = new @Browser()
	b.start()

class @Browser# extends @NodeJsApp
	#configuration
	url: "file://" + __dirname + "/contents/index.html"
	ignore_data_dir: "ignore_data"
	cson_path: "./ignore_data/browser.cson"
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
		try
			result = @cson.load(@cson_path)
		catch e
			@fs.mkdir(@ignore_data_dir,=>@fs.writeFile(@cson_path))
			result =
				x: 0
				y: 240
				width: 700
				height: 800
		@[key] = val for key, val of result
	start: ->
		require("crash-reporter").start()
		@ipc_event()
		@app_start()
	ipc_event: ->
		@ipc.on('inspect element', (event, arg, renderer) =>
			#event.sender.send 'asynchronous-reply', 'pong')
			@[renderer].inspectElement(arg.x, arg.y)
		)
	app_start: ->
		@app.on("window-all-closed", =>
			@app.quit() unless process.platform is "darwin"
		)
		@app.on("ready", =>
			@make_window()
			@etc()
		)
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
			obj = @cson.load(@cson_path)
			obj.x = xy[0]
			obj.y = xy[1]
			obj.width = wh[0]
			obj.height = wh[1]
			cson_string = @cson.createCSONString(obj)
			@fs.writeFileSync(@cson_path, cson_string)
			@mainWindow = (null)
		)
	global_shortcut: ->
			ret = @globalShortcut.register('ctrl+e', =>
				console.log("#{Date.now()} , ctrl+e is pressed")
			)
	etc: ->
		@global_shortcut()

start()
