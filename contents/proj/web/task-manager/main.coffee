class TaskManager extends ClientApp
  constructor: ->
    super()
    @e = new TaskManagerEvent(@, @ws)
    @s = new TaskManagerSocket(@, @ws)
    @e.set()

class TaskManagerSocket
  constructor: (@parent, @socket) ->
    @socket.on("connect", =>
      @socket.on("change task", (task) =>
        @parent.e.display(task)
        )
      )

class TaskManagerEvent
  constructor: (@parent, @socket) -> 1
  display: (task) ->
    console.log task
    $top = $(".top").empty()
    $top_template = $("#template-task .assign")
    $middle = $(".middle").empty()
    $middle_template = $(".template.indivisual .indivisual-task")
    $middle_template_task = $(".template.indivisual-task-span .task")
    $bottom = $(".bottom").empty()
    bottom_obj = {}
    for key, val of task
      if Object.keys(val).length is 0
        $dom = $top_template.clone().text(key)
        $top.append($dom)
      else unless val.status is "close"
        console.log key,val
        if ($dom = $middle.find("[name=#{val.user}]"))[0]
          
        else
          $dom = $middle_template.clone()
          $middle.append($dom)
          $dom_bottom = $middle_template.clone()
          $bottom.append($dom_bottom)
        $dom.append($task = $middle_template_task.clone())
        $task.append(key)
        $dom.children(".name").text(val.user).attr("name", val.user)
      else
        1
  set: ->
    if localStorage.name then $("[name=name]").val(localStorage.name)
    $(document).on("keydown", "[name=task]", (e) =>
      if e.keyCode is 13
        $target = $(e.target)
        text = $target.val()
        unless text then return
        @socket.emit("add task", text)
        $target.val("")
      )
    $(document).on("keydown", "[name=name]", (e) =>
      $target = $(e.target)
      text = $target.val()
      unless text then return
      localStorage.name = text
      )
    $(document).on("click", ".assign", (e) =>
      $target = $(e.target)
      console.log "check task"
      @socket.emit("check task", localStorage.name, $target.text())
      )
    $(document).on("click", "input[name=change_status]", (e) =>
      console.log "change status on task"
      $status = $(".status-button").clone()
      $target = $(e.target)
      console.log $target
      )

$ =>
  @tm = new TaskManager()