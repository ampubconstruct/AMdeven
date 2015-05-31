/*
var ae = new AutoEvent()
ae.click(selector).wait(3000).click(selector)
*/

class AutoEvent {
  constructor(){

  }
  set_value(selector, value) {
    document.querySelector(selector).value = value
  }
  click(selector){
    document.querySelector(selector).click()
    return this
  }
  wait(msec){
  }
  wait_selector(selector){

  }
}
