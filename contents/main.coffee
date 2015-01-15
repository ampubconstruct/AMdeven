###
document: https://github.com/atom/atom-shell/blob/master/docs/api/web-view-tag.md
how to use:
	@es = new @ExternalSite "#foo"
###

class @ExternalSite
	webview: 0
	ready_flag: 0
	jq_flag: "2.1.3"
	constructor: (@selector) ->
		@webview = document.querySelector(@selector)
		@webview_event()
		@webview.addEventListener("did-finish-load", @finish)
	webview_event: ->
		@webview.addEventListener "console-message", (event) =>
			console.log "%c#{event.message}", "color: green"
	#load終了後
	finish: =>
		++@ready_flag
		###jQuery###
		if @jq_flag
			@exejs """ //"
				//# read jQuery
				if (!window.jQuery) {
						document.body.appendChild((function(){
								var s = document.createElement("script");
								s.type = "text/javascript";
								s.src = "http://ajax.googleapis.com/ajax/libs/jquery/#{@jq_flag}/jquery.min.js"; 
								return s;
						})())
				};
				//# set key press Event
				window.triggerKeyDown = function (selector, keyCode) {
					$(selector).focus();
					var e;
					// Enter Keyの処理
					if (keyCode === 13) e = jQuery.Event("keypress");
					else e = jQuery.Event("keyup");
					e.which = keyCode; // # Some key code value
					$(selector).val($(selector).val() + String.fromCharCode(e.which));
					$(selector).trigger(e);
				}
				""" #"
		###内包コード###
		
		1
	exejs: (code) ->
		@webview.executeJavaScript code
		#console.log code
		1
	test: ->
		code = 'document.querySelector("#gbqfq").value = "tarou";'
		@webview.executeJavaScript code
$ =>
	@es = new @ExternalSite "#foo"
	
1







1