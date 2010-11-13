var ctx;
var keyPressed = {
	up: false,
	down: false,
	left: false,
	right: false,
};
var playGround = {
	w: 0,
	h: 0,
};
var player = {
	w:20,
	h:20,
	x:200,
	y:200,
	vx:0,
	vy:0,
	draw: function(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.w, this.h);
		ctx.closePath();
		ctx.fill();
	},
	move:  function(){
		document.getElementById('status').innerHTML = "keyPressed.up: " + keyPressed.up 
													+ "<br> keyPressed.down: " + keyPressed.down
													+ "<br> keyPressed.left: " + keyPressed.left
													+ "<br> keyPressed.right: " + keyPressed.right
													+ "<br> player.x: " + this.x
													+ "<br> player.y: " + this.y
													+ "<br> player.vx: " + this.vx
													+ "<br> player.vy: " + this.vy;
		if(keyPressed.up) this.vy = -2;
		if(keyPressed.down) this.vy = 2;
		if(keyPressed.left) this.vx = -2;
		if(keyPressed.right) this.vx = 2;

		this.x += this.vx;
		this.y += this.vy;
		this.vx *= 0.95;
		this.vy *= 0.95;
		
		if(this.x <= 0 || this.x + this.w >= playGround.w){
			this.vx = -this.vx;
			this.x = 0;			
		}
		if(this.y <= 0 || this.y + this.h >= playGround.h){
			this.vy = -this.vy;
			this.y = 0;
		}
			
	},
	isLeftOf: function(p){ //seite 63
		return this.x + this.w < p.x;
	},
	isAbove: function(p){
		return this.y < p.y +p.h;
	},
	touches: function(p){
		if(this.isLeftOf(p)) 	return false;
		if(p.isLeftOf(this)) 	return false;
		if(this.isAbove(p)) 	return false;
		if(p.isAbove(this)) 	return false;
		return true;
	}
	
};

function init(){
	var canvas = document.getElementById("gameCanvas");
	playGround.w = canvas.width;
	playGround.h = canvas.height;
	ctx = canvas.getContext("2d");
	setInterval(mainLoop, 10);
}

function onKeyDown(evt) {
  if (evt.keyCode == 38) keyPressed.up = true;
  if (evt.keyCode == 40) keyPressed.down = true;
  if (evt.keyCode == 37) keyPressed.left = true;
  if (evt.keyCode == 39) keyPressed.right = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 38) keyPressed.up = false;
  if (evt.keyCode == 40) keyPressed.down = false;
  if (evt.keyCode == 37) keyPressed.left = false;
  if (evt.keyCode == 39) keyPressed.right = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);



function mainLoop(){
	ctx.clearRect(0, 0, playGround.w, playGround.h);
	//rect(0,0,playGround.w, playGround.h);
	player.draw();
	player.move();
}
