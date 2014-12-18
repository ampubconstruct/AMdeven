app = require("app")
ipc = require "ipc"
BrowserWindow = require("browser-window")
globalShortcut = require('global-shortcut')
#
require("crash-reporter").start()
mainWindow = (null)

#ipc
ipc.on 'inspect element', (event, arg) =>
	#event.sender.send 'asynchronous-reply', 'pong'y)
	console.log arg
	mainWindow.inspectElement(arg.x, arg.y)
#app
app.on "window-all-closed", ->
	app.quit()  unless process.platform is "darwin"
app.on "ready", ->
	mainWindow = new BrowserWindow(
		width: 800
		height: 800
	)
	mainWindow.loadUrl "file://" + __dirname + "/contents/index.html"
	mainWindow.openDevTools()
	mainWindow.on "closed", ->
		mainWindow = (null)
	#
	#ret = globalShortcut.register 'ctrl+x', =>
		#console.log('ctrl+x is pressed')
	
1


