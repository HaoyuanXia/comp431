
'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	
	var sun_move = -2;
	var car_move = -5;
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	//add variables and arrays to record the building information
	var count = 0;
	var x0_arr = new Array();
	var width_arr = new Array();
	var height_arr = new Array();
	var colors = new Array();
	var t_out = setInterval(update, 200);
	

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3
	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	
	//build a building
	var build = function() { 
		console.log('build')
		var x0 = Math.random()*canvas.width
		var blgWidth = 10 + (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = 20 + Math.random()*canvas.height/2
		var color = blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillStyle = color
		
		//record the building information
		x0_arr[count] = x0;
		width_arr[count] = blgWidth;
		height_arr[count] = blgHeight;
		colors[count] = color
		count++;

		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		
		for (var y = floor - floorSpacing; y > floor - blgHeight + 5; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.random()>0.6){
					c.fillStyle="yellow"
				} else {
					c.fillStyle="black"
				}
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	function update(){
		c.fillStyle="white"
		c.fillRect(0, 0, canvas.width, floor)
		var s = 25 + sun_move * 5;
		sun_move++;
		if(s - 25 >= canvas.width){
			sun_move = 0;
		}
		c.drawImage(document.getElementById("sun"), s, 50, 40, 40);
		
		for(var i=0; i<count; i++){
			console.log(colors[i])
			c.fillStyle = String(colors[i])
			c.fillRect(x0_arr[i], floor - height_arr[i], width_arr[i], height_arr[i]);
			for (var y = floor - floorSpacing; y > floor - height_arr[i] + 5; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < width_arr[i] - windowWidth; x += windowSpacing + windowWidth) {
					if (Math.random()>0.6){
						c.fillStyle="yellow"
					} else {
						c.fillStyle="black"
					}
					c.fillRect(x0_arr[i] + x, y - windowHeight, windowWidth, windowHeight)
				}
			}			
		}
		
		var cc = 30 + car_move * 10;
		car_move++;
		if(cc - 80 >= canvas.width){
			car_move = 0;
		}
		
		c.drawImage(document.getElementById('car'), cc, floor-30, 80, 30);
	}

//get mouse click position, judge and grow the building
	var mycanvas = document.getElementById('myCanvas');
	mycanvas.addEventListener("mousedown", getPosition, false);

	function getPosition(event){
		var x = event.x;
		var y = event.y;
		x -= mycanvas.offsetLeft;
		y -= mycanvas.offsetTop;
		y = y - 50;
		console.log('Mouse position: ' + x + ',' + y);
		for(var i=0; i<count; i++){
			if(x>x0_arr[i] && x<x0_arr[i]+width_arr[i] && y>floor - height_arr[i] && y<floor){
				height_arr[i] = height_arr[i] + 10;
				
				break;
			}		
		}

	}

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}

