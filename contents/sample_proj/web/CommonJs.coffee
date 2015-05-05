if require? then @CommonJs = require("../../web/mylib/CommonJs.js")

class @CommonJs extends @CommonJs
	http_port: 8081 #default 8080
	ws_port: 8081 #50000

module?.exports = @CommonJs
