var babel = require("babel")
var exec = require("child_process").exec
var fs = require("fs")

export default class CompilerSrc {
  log(msg){
    try {
      process.send(msg)
    } catch (e) {
      console.log(msg)
    }
  }
  compile_babel(filepath) {
    babel.transformFile(filepath, (e, result) => {
      if(e) return this.log(e.message)
      else fs.writeFile(filepath.replace(/\.es6$/, ".js"), result.code)
    })
  }
  compile_coffee(filepath) {
    let command = `iojs ./node_modules/coffee-script/bin/coffee -mc ${filepath}`
    exec(command, (e, stdout, stderr) => {
      if(e) this.log(stderr.replace(/.*:([0-9]+:[0-9]+.*)/, "$1"))
      else 1
    })
  }
  compile_sass(filepath) {
    let command = `sass ${filepath}`
    exec(command, (e, stdout, stderr) => {
      if(e) return this.log(stderr)
      else {
        let command = `sass ${filepath} ${filepath.replace(/sass$/, 'css')}`
        exec(command)
      }
    })
  }
}

/*
CompilerSrc.prototype.compile_babel("./contents/nodejs/CompilerSrc.es6")
CompilerSrc.prototype.compile_coffee("./contents/main.coffee")
CompilerSrc.prototype.compile_sass("./contents/default.sass")
*/
