class @NodeClient extends @CommonJs
	###modules###
	ws: 1
	###websocket required variables###
	domain: location.host.replace /:.*/, ""
	params: 0
	constructor: ->
		@params = @get_params location.href
		if @params.ws then @connect_websocket()
	connect_websocket: ->
		@ws_url = "ws://#{@domain}:#{@ws_port}"
		@ws = io @ws_url
		@ws.on "connect", =>
			console.log "websocket connected"
			if @params.g then @ws.emit "g", (if typeof(@params.g) is "object" then @params.g else [@params.g])
			@ws.on "reload", => location.reload()
