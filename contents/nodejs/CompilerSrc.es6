var babel = require("babel")
var exec = require("child_process").exec
var fs = require("fs")

class CompilerSrc {
  log(msg){
    try {
      process.send(msg)
    } catch (e) {
      console.log(msg)
    }
  }
  compile_babel(filepath) {
    babel.transformFile(filepath, (err, result) => {
      if(err) return this.log(err.message)
      else fs.writeFile(filepath.replace(/\.es6$/, ".js"), result.code)
    })
  }
  compile_coffee(filepath) {

  }
  compile_sass(filepath) {

  }
}

CompilerSrc.prototype.compile_babel("./contents/nodejs/CompilerSrc.es6")
