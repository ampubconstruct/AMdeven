/*
var ae = new AutoEvent()
ae.click(selector).wait(3000).click(selector)
ae.start()
*/

class AutoEvent {
  later() { // 追加
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000)
    })
  }
  constructor(){
  }
  *contoller(){
    let i = -1
    while(this.funcs[++i]) {
      this.inner_funcs[i].push(() => this.gen.next())
      yield this.funcs[i]()
    }
  }
  register(){
    this.funcs = []
    this.inner_funcs = []
    this.gen = this.contoller()
    this.func_num = -1
    return this
  }
  // event群
  add_event(callback) {
    let func_num = this.func_num
    let inner_func =this.inner_funcs[func_num]
    inner_func.push(callback)
    return this
  }
  set_value(selector, value) {
    return this.add_event(() => document.querySelector(selector).value = value)
  }
  click(selector){
    return this.add_event(() => document.querySelector(selector).click())
  }
  // async群
  wait_event(callback){
    this.funcs.push(callback)
    return this
  }
  wait(msec) {
    let func_num = ++this.func_num
    let inner_func = this.inner_funcs[func_num] = []
    let func = () => {
      for(let func of inner_func) func()
    }
    let testTimer = null
    return this.wait_event(() => setTimeout(func, msec))
  }
  wait_selector(selector, exists=true){
    let func_num = ++this.func_num
    let inner_func = this.inner_funcs[func_num] = []
    let func = () => {
      for(let func of inner_func) func()
    }
    let testTimer = null
    let stop_timer = ()=>{
      clearInterval(testTimer)
      func()
    }
    return this.wait_event(() => {
      testTimer=setInterval(function(){
        if(document.querySelector(selector)&&exists) stop_timer()
      }, 100);
    })
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.ae = new AutoEvent()
  ae.register()
    .wait(1000).click(".text").click(".text")
    .wait(1500).click(".text").set_value("#text",300)
    .wait_selector(".super-test").set_value("#text", 3000)
    .gen.next()
  // ae.start()
})
