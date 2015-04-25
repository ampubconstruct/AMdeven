@App = require("./contents/proj/node/NodeProjApp.js")
@a = new @App()
@a.server.start(8080,8080)
