$ =>
	@aac = new @AtomAppClient

###
@perfectSquares = ->
	num = 0
	loop
		num += 1
		console.log num
		yield num * num
	return

window.ps or= perfectSquares()
###
