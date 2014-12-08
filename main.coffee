app = require("app")
BrowserWindow = require("browser-window")
require("crash-reporter").start()
mainWindow = (null)
console.log @

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