@compiler = require('child_process').fork('./contents/nodejs/Compiler.js')
@compiler.on("message",(msg) => console.log msg)
@App = require("./proj/node/NodeProjApp.js")
@a = new @App()
