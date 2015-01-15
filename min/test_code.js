
// success 何故２回読まないといけない・・？
var script = document.createElement("script");
script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
script.onload=function(){
	var script = document.createElement("script");
	script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
	script.onload=function(){
		console.log("read jQuery.");
	}
	document.head.appendChild(script);
}
document.head.appendChild(script);


// success
$("#what").focus();
var e = jQuery.Event("keyup");
e.which = 97; // # Some key code value
$("#what").val(String.fromCharCode(e.which));
$("#what").trigger(e);
		
		
// ?
window.triggerKeyDown = function (selector, keyCode) {
	var e = $.Event("keydown");
	e.which = keyCode;
	$(selector).trigger(e);
};
	
//以下エラー

if (typeof jQuery === "undefined" || jQuery === null) {
	var j=document.createElement('script');
	j.type='text/javascript';
	j.src='https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	document.body.appendChild(j);
	j.onload=l
};

	(function(d){
		if(typeof jQuery === "undefined" || jQuery === null){
			var j=d.createElement('script');
			j.type='text/javascript';
			j.src='https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
			d.body.appendChild(j);
			j.onload=l
		function l(){
			(function($){})(jQuery)
		}
	}else{l()}
	})(document);
	
	
var j=document.createElement('script');
j.type='text/javascript';
j.src='https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
document.body.appendChild(j);
	
javascript:
(function(d,s){
  s=d.createElement('script');s.src='https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';d.body.appendChild(s);
})(document)


//

window.$=undefined;window.jQuery=undefined;
var script = document.createElement("script");
script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
script.onload=function(){
	console.log("read jQuery.");
}
document.head.appendChild(script);