$ =>
	@aac = new @AtomAppClient
	console.log 2

####
@perfectSquares = ->
	num = 0
	loop
		num += 1
		console.log num
		if num > 5 then return
		yield num * num
	return
window.ps or= perfectSquares()
ps.next()
ps.next()
ps.next()
####


1
