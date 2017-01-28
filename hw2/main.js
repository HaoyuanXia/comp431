'use strict'

var intervals = new Array(8)

var text = "Sed vehicula tellus non tellus pellentesque, et vestibulum risus convallis. \
		Phasellus ac lobortis orci, pulvinar ullamcorper dolor. In hac habitasse platea dictumst. \
		Nam eu diam aliquet, ultricies neque eu, egestas est. Nulla ac tortor pellentesque nunc tempor semper. \
		Phasellus consequat velit ex, ut fermentum justo ornare in. Nulla et varius leo. \
		Phasellus ultricies ex aliquam augue volutpat vulputate. Pellentesque sed fringilla magna. \
		Nulla tempor turpis quis elementum commodo. \
		Phasellus malesuada turpis velit, sed pharetra tortor congue ut. \
		Nunc id nibh vitae ex aliquam rutrum sit amet vel turpis."

var images = new Array(8)

images[0] = "https://img.clipartfest.com/392d43268e86b0bd1c86f4208d2c55aa_stuffed-animals-clip-art-clipart-of-cartoon-animals_2555-4009.png"
images[1] = "https://img.clipartfest.com/fc04be12452bf7263f972003fdcd2e89_free-cartoon-baby-animal-clip-clipart-of-cartoon-animals_425-415.jpeg"
images[2] = "https://img.clipartfest.com/db894015f31737992a3d81314ccb4c09_cartoon-animals-clipart-clipart-of-cartoon-animals_3333-6253.png"
images[3] = "https://s-media-cache-ak0.pinimg.com/236x/9a/bb/29/9abb29b0668d37f4c6de7394c42c7cfd.jpg"
images[4] = "http://www.clipartbest.com/cliparts/LcK/dRj/LcKdRjBpi.png"
images[5] = "https://img.clipartfest.com/1ec82f5c129a7d23cb7360d4f35899f4_cartoon-goat-clip-art-clipart-animals-cartoon_361-425.jpeg"
images[6] = "http://zellox.com/wp-content/uploads/2016/05/cartoon-animal.jpg"
images[7] = "http://cliparts.co/cliparts/ki8/nKE/ki8nKEdbT.png"

var imgIdx = new Array(8)

var helperArray = new Array(0,1,2,3,4,5,6,7)

window.onload = function (item) {
	var table = document.getElementById("table")
	table.innerHTML = "<tr class='info'> <th> Image </th> <th> Button </th> <th> Text </th> </tr>"

	for(var index = 0; index < 8; index++) {
		table.innerHTML += "<tr class='card-noImg'> <td> <h4> No Image </h4> </td> <td> <h5> No Button </h5> \
			<td class='text'>" + text + "</td> </tr>"
		table.innerHTML += "<tr class='card-img'> \
			<td class='image'> <img src='" + images[index] + "' id='img" + String(index) + "'> </td> \
			<td> <button class='btn btn-primary' \
			id='btn" + String(index) + "' onclick='updateBtn(" + String(index) + ")'> Stop </button> \
			<td class='text'>" + text + "</td> </tr>"
		imgIdx[index] = index
		intervals[index] = setInterval(_updateImg(index), (Math.floor(Math.random() * 4) + 1) * 1000)
	}
}

function updateImg(i) {
	var img = document.getElementById('img' + String(i))
	imgIdx[i] = (imgIdx[i] + 1) % 8
	img.src = images[imgIdx[i]]
}

function _updateImg(i) {
	return function() {
		updateImg(i)
	}
}

function updateBtn(i) {
	if(document.getElementById('btn' + String(i)).innerHTML == ' Stop ') {
		clearInterval(intervals[i])
		document.getElementById('btn' + String(i)).innerHTML = ' Start '
	} else {
		intervals[i] = setInterval(_updateImg(i), (Math.floor(Math.random() * 4) + 1) * 1000)
		document.getElementById('btn' + String(i)).innerHTML = ' Stop '
	}
}

function _updateBtn(i) {
	return function() {
		updateBtn(i)
	}
}





