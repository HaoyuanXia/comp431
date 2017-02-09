var actionInterval = 0;
var ballFromEnemy = [];
var ballFromPlayer = [];
var mouseDownTime = 0;
var level = null;
var remainingSnowballs = 10;
var score = 0;
var clickTimes = 0;

if(getCookie("bestScore") != "") {
	document.getElementById("bestScore").innerHTML = getCookie("bestScore");
}

if(getCookie("hitRate") != "") {
	document.getElementById("bestHitRate").innerHTML = getCookie("hitRate");
}

function startGame(argument) {
	level = argument;
	player = new character("kyle");
	enemy = new character("kenny");
	strength = new strength();
	gameArea.start();
}

var gameArea = {
	canvas : document.getElementById("myCanvas"),
	start : function () {
		document.getElementById("entry").style.display = "none";
		document.getElementById("panel").style.display = "block";
		this.context = this.canvas.getContext("2d");
		this.interval = setInterval(updateGameArea, 20);
		this.canvas.addEventListener("mouseover", function (event) {
			gameArea.canvas.addEventListener("mousemove", move, false);
		}, false);
		this.canvas.addEventListener("mousedown", function() {
			mouseDownTime = Date.now();
			power = setInterval(function() {
				strength.strength += 10;
			}, 10);
		}, false);
		mouseUpEvent = this.canvas.addEventListener("mouseup", shoot, false);
		actionEnemy();

	},
	clear : function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function () {
		clearInterval(this.interval);
	}
}

function character(name) {
	if(name == "kyle") {
		this.image = document.getElementById("kyle1");
		this.x = gameArea.canvas.width / 2 - this.image.width / 2;
		this.y = gameArea.canvas.height - this.image.height;	
	} else {
		this.image = document.getElementById("kenny1");
		this.x = gameArea.canvas.width / 2 - this.image.width / 2;
		this.y = 0;
	}
	this.speed = 10;
	this.width = this.image.width;
	this.height = this.image.height;

	this.update = function () {
		ctx = gameArea.context;
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
	
	this.crashWith = function (otherObj) {
		var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var otherleft = otherObj.x;
        var otherright = otherObj.x + otherObj.width;
        var othertop = otherObj.y;
        var otherbottom = otherObj.y + otherObj.height;
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    
}


function snowball(imageId, x, y, speed) {
	this.image = document.getElementById(imageId);
	switch (level) {
		case 'easy':
			this.speed = 5;
			break;
		case 'medium':
			this.speed = 10;
			break;
		case 'hard':
			this.speed = 15;
			break;			
		default:
			break;
	}
	if(speed != null) {
		this.speed = speed;
	}
	this.width = this.image.width;
	this.height = this.image.height;
	this.x = x;
	this.y = y;
	this.update = function () {
		ctx = gameArea.context;
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}

function strength(strength=0) {
	canvasWidth = gameArea.canvas.width;
	canvasHeight = gameArea.canvas.height;
	this.strength = strength;

	this.update = function() {
		ctx = gameArea.context;
		ctx.strokeStyle = "grey";
		ctx.lineWidth = 3;
		ctx.strokeRect(canvasWidth - 40, canvasHeight / 2 - 150, 20, 300);

		grd = ctx.createLinearGradient(0, canvasHeight / 2 - 150, 0, canvasHeight / 2 + 150);
		grd.addColorStop(0,"red");
		grd.addColorStop(1,"white");
		ctx.fillStyle = grd;
		yPosition = Math.max(canvasHeight / 2 - 150, canvasHeight / 2 + 150 - this.strength / 2.5);
		
		ctx.fillRect(canvasWidth - 40, yPosition, 20, canvasHeight / 2 + 150 - yPosition);
	}
} 

function updateGameArea() {
	gameArea.clear();
	player.update();
	enemy.update();
	strength.update();

	displayInfo();

	var deleteNode = [];


	if(remainingSnowballs == 0) {
		gameArea.canvas.removeEventListener("mouseup", shoot, false);
		clearInterval(power);
		setTimeout(gameOver, 2500);
	}

	for(i = 0; i < ballFromEnemy.length; i++) {
		if(player.crashWith(ballFromEnemy[i])) {
			player.image = document.getElementById("bomb");
			player.update();
			gameOver();
		}
		if(ballFromEnemy[i].y > canvasHeight - 10) {
			deleteNode.push(i);
		}
		ballFromEnemy[i].y += ballFromEnemy[i].speed;
		ballFromEnemy[i].update();
	}
	deleteNode.reverse();
	for(var i in deleteNode) {
		ballFromEnemy.splice(i, 1);
	}

	deleteNode = [];

	for(i = 0; i < ballFromPlayer.length; i++) {
		if(enemy.crashWith(ballFromPlayer[i])) {
			score += 1;
			deleteNode.push(i);
			enemy.image = document.getElementById("bomb");
			setTimeout(function () {
				enemy.image = document.getElementById("kenny1");
			}, 200);
		}
		if(ballFromPlayer[i].y < 10) {
			deleteNode.push(i);
		}
		ballFromPlayer[i].y -= ballFromPlayer[i].speed;
		ballFromPlayer[i].update();
	}
	deleteNode = deleteNode.reverse();
	for(var i in deleteNode) {
		ballFromPlayer.splice(i, 1);
	}

}

// move the character
function move(event) {
	
	position = event.clientX - gameArea.canvas.getBoundingClientRect().left - player.width / 2;
	if(position < 0) {
		player.x = 0;
	} else {
		if(position > gameArea.canvas.width - player.width) {
			player.x = gameArea.canvas.width - player.width;
		} else {
			player.x = position;
		}
	}
	if(actionInterval == 0) {
		actionInterval = setInterval(function () {
			if(player.image.id == "kyle1") {
				player.image = document.getElementById("kyle2");
			} else {
				player.image = document.getElementById("kyle1");
			}
		}, 200);
	}
	clearTimeout(this.timer);
	this.timer = setTimeout(function () {
			clearInterval(actionInterval);
			actionInterval = 0;
		}, 100);
}


function actionEnemy() {
 
 	timeSlot = 0;

	switch (level) {
		case 'easy':
			timeSlot = 1500;
			break;
		case 'medium':
			timeSlot = 1000;
			break;
		case 'hard':
			timeSlot = 500;
			break;			
		default:
			break;
	}

	//shoot
	enemyShoot = setInterval(function () {
		x = enemy.x + enemy.width - 30;
		y = enemy.height / 2;
		ballFromEnemy.push(new snowball("snowball2", x, y));
	}, timeSlot, false);

	// animation
	setInterval(function () {
		if(enemy.image.id == "kenny1") {
			enemy.image = document.getElementById("kenny2");
		} else if (enemy.image.id == "kenny2") {
			enemy.image = document.getElementById("kenny1");
		}
	}, 300, false);

	// move
	setInterval(function () {
		enemy.x += enemy.speed;
		if(enemy.x < 0) {
			enemy.x = 0;
			enemy.speed = -enemy.speed;
		}
		if(enemy.x > gameArea.canvas.width - enemy.width) {
			enemy.x = gameArea.canvas.width - enemy.width;
			enemy.speed = -enemy.speed;
		}
	}, 50, false);

	// 
	setInterval(function () {
		if(Math.random() < 0.5) {
			enemy.speed = -enemy.speed;
		}
	}, 500, false);
}

function shoot() {
	x = player.x + player.width - 30;
	y = gameArea.canvas.height - player.height / 2;

	timePeriod = Date.now() - mouseDownTime;
	speed = Math.min(5 + timePeriod / 50, 20);
	ballFromPlayer.push(new snowball("snowball1", x, y, speed));

	remainingSnowballs -= 1;

	strength.strength = 0;
	clearInterval(power);

	if(remainingSnowballs == 7 || remainingSnowballs == 3) {
		timeSlot *= 0.5;
		clearInterval(enemyShoot);
		//shoot
		enemyShoot = setInterval(function () {
			x = enemy.x + enemy.width - 30;
			y = enemy.height / 2;
			ballFromEnemy.push(new snowball("snowball2", x, y));
		}, timeSlot, false); 
	}

	clickTimes += 1;
}

function gameOver() {
	clearInterval(gameArea.interval);
	ctx = gameArea.context;
	ctx.font = "30px Comic Sans MS";
	ctx.textAlign = "center";
	ctx.fillText("Game Over", gameArea.canvas.width / 2, gameArea.canvas.height / 2);
	ctx.fillText("Your Score: " + score, gameArea.canvas.width / 2, gameArea.canvas.height / 2 + 50);
	var hitRate = score / clickTimes;

	if(getCookie("hitRate") == "" || parseFloat(getCookie("hitRate")) < hitRate) {
		setCookie("hitRate", String(hitRate.toFixed(2)), 1);	
	}

	if(getCookie("bestScore") == "" || parseFloat(getCookie("bestScore")) < score) {
		setCookie("bestScore", String(score), 1);	
	}
	
}

function displayInfo() {
	ctx = gameArea.context;
	ctx.fillStyle = "black";
	ctx.font = "20px Comic Sans MS";
	ctx.textAlign = "center";
	ctx.fillText("Score:", 40, 30);
	ctx.fillText(score, 40, 50);
	ctx.fillText("Level:", 40, 70);
	ctx.fillText(level, 40, 90);
	ctx.fillText("Snowballs: ", gameArea.canvas.width - 50, 30);
	ctx.fillText(remainingSnowballs, gameArea.canvas.width - 50, 50);
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



