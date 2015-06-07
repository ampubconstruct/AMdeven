@compiler = require('child_process').fork('./contents/nodejs/Compiler.js')
@compiler.on("message",(msg) => console.log msg)
@App = require("./proj/node/NodeProjAppEs6.js")
@a = new @App()
