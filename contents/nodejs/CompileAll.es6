import NodeApp from "./NodeApp"
import CompilerSrc from "./CompilerSrc"

class CompileAll extends CompilerSrc {
  constructor(){
    super(false)
    NodeApp.prototype.check_dir_tree("./", /(es6|coffee|sass)$/, (loc, file) => {
      if(file.match(/es6$/))          this.compile_babel(loc)
      else if (file.match(/coffee$/)) this.compile_coffee(loc)
      else if (file.match(/sass$/))   this.compile_sass(loc)
    })
  }
}

new CompileAll()
