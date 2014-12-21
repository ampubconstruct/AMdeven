start = =>
	#b = new @Browser()
	b = new @CrossRenderer()
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
		)
		@mainWindow.loadUrl @url
		@mainWindow.openDevTools()
		@mainWindow.on "closed", ->
			@mainWindow = (null)
	global_shortcut: ->
			ret = @globalShortcut.register 'ctrl+e', =>
				console.log('ctrl+e is pressed')
			1
	etc: ->
		@global_shortcut()
	1
class @CrossRenderer extends @Browser
	subWindow: 0
	subWindowUrl: "http://jp.indeed.com/"
	#super funcs
	etc: ->
		super()
		@set_browser_emit_event()
	start: ->
		super()
	ipc_event: ->
		super()
		@ipc_event_renderer()
	make_window: ->
		super()
		@add_window()
		@move_window()
		@set___ipcEvent_for_external_site()
		@set_inspect_mode(@subWindow)
	#add funcs
	move_window: ->
		#@subWindow.webContents.once "did-finish-load", =>
		@mainWindow.setTitle("atom-shell MainWindow")
		@subWindow.setTitle("atom-shell SubWindow")
		@shell.openItem("set2renderer.exe")
	add_window: ->
		@subWindow = new @BrowserWindow(
			width: 800
			height: 800
		)
		@subWindow.loadUrl @subWindowUrl
		@subWindow.openDevTools()
		@subWindow.on "closed", ->
			@subWindow = (null)
	ipc_event_renderer: ->
		@ipc.on "send_browser", (event, arg) =>
		@ipc.on "send_renderer_via_browser", (event, data, renderer) =>
			@[renderer].webContents.send "via_browser", data
		@ipc.on "execute_renderer", (event, code, renderer) =>
			@[renderer].webContents.executeJavaScript code
		#
	set___ipcEvent_for_external_site: (renderer = "subWindow") -> #if all external sites.
		@[renderer].webContents.executeJavaScript """
			if (typeof ___ipc === "undefined" || ___ipc === null) {
				window.___ipc = require('ipc'); 
				// receive
				___ipc.on('via_browser', function(data) {console.log(data);});
				___ipc.on("send_renderer_from_browser", function(data){
					console.log(data);
				});
				// serve
				___ipc.send('send_renderer_via_browser', 'data_man', 'mainWindow');
			}
		"""
	set_inspect_mode: (renderer) ->
		renderer.webContents.executeJavaScript '''
			document.addEventListener("mousedown", function(e) {
				var obj;
				if (e.button === 2) {
					obj = {
						x: e.clientX,
						y: e.clientY
					};
					___ipc.send("inspect element", obj, "subWindow");
				}
			});
		'''
	set_browser_emit_event: ->
		ret = @globalShortcut.register 'Ctrl+Shift+D', =>
			@mainWindow.webContents.send "send_renderer_from_browser", 321
			@subWindow.webContents.send "send_renderer_from_browser", 321
start()










1
