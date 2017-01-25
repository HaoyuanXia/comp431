
var won = false

var moveBtn = function() {
	var btn = document.getElementById("button")
	btn.style.top = String(Number(btn.style.top.substring(0, btn.style.top.length - 2)) + 30) + "px"
}
function clickme() {
	var btn = document.getElementById("button")
	var wonDiv = document.getElementById("wonDiv")
	if(!won) {
		btn.innerHTML = "Play Again"
		wonDiv.style.display = 'block'
		btn.removeEventListener('mouseover', moveBtn)
		won = true
	} else {
		btn.innerHTML = "Click Me"
		btn.style.top = "0px"
		wonDiv.style.display = 'none'
		btn.addEventListener('mouseover', moveBtn)
		won = false
	}
}
window.onload = function () {	
	var btn = document.getElementById("button")

	btn.addEventListener("mouseover", moveBtn, false)
	var addEvent = function() {
		if(!won) {
			btn.addEventListener("mouseover", moveBtn)
		}
	}
	var removeEvent = function(event) {
		if(event.shiftKey) {
			btn.removeEventListener("mouseover", moveBtn)
		}
	}
	window.addEventListener("keyup", addEvent, false)
	window.addEventListener("keydown", removeEvent, false)

}


