start = =>
	b = new @Browser()
	b.start()

class @Browser
	#url
	url: "file://" + __dirname + "/contents/index.html"
	#require
	app: require("app")
	ipc: require "ipc"	
	BrowserWindow: require("browser-window")
	globalShortcut: require('global-shortcut')
	shell: require("shell")
	#member
	mainWindow: 0
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
			width: 800
			height: 800
			#show: (false)
		)
		@mainWindow.loadUrl @url
		@mainWindow.openDevTools()
		@mainWindow.on "closed", ->
			@mainWindow = (null)
		@move_window()
	move_window: ->
		@mainWindow.setTitle "atom-shell MainWindow"
		@shell.openItem("set_renderer.exe")
	global_shortcut: ->
			ret = @globalShortcut.register 'ctrl+e', =>
				console.log('ctrl+e is pressed')
			1
	etc: ->
		@global_shortcut()
	1

	
	
	
start()










1
