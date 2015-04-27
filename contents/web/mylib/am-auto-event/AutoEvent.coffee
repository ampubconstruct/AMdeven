class @AmAutoEvent
  constructor: ->
    @funcs = []
    @gen = @auto_event()
  start: -> @gen.next()
  set_event: (callback, wait_msec) =>
    @funcs.push( =>
      setTimeout( =>
        callback()
        @gen.next()
      , wait_msec)
    )
  auto_event: ->
    num = 0
    while @funcs[num]
      yield @funcs[num++]()

sample_code =>
  aae = new AmAutoEvent()
  aae.set_event( =>
    console.log(222)
  , 1000)
  aae.set_event( =>
    console.log(444)
  , 1000)
  aae.start()

module?.exports = @AmAutoEvent
