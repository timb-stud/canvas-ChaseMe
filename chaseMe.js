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
		ctx.rect(player.x, player.y, player.w, player.h);
		ctx.closePath();
		ctx.fill();
	},
	move:  function(){
		document.getElementById('status').innerHTML = "keyPressed.up: " + keyPressed.up 
													+ "<br> keyPressed.down: " + keyPressed.down
													+ "<br> keyPressed.left: " + keyPressed.left
													+ "<br> keyPressed.right: " + keyPressed.right
													+ "<br> player.x: " + player.x
													+ "<br> player.y: " + player.y
													+ "<br> player.vx: " + player.vx
													+ "<br> player.vy: " + player.vy;
		if(keyPressed.up) player.vy = -2;
		if(keyPressed.down) player.vy = 2;
		if(keyPressed.left) player.vx = -2;
		if(keyPressed.right) player.vx = 2;

		player.x += player.vx;
		player.y += player.vy;
		player.vx *= 0.95;
		player.vy *= 0.95;
		
		if(player.x <= 0 || player.x + player.w >= playGround.w){
			player.vx = -player.vx;
			player.x = 0;			
		}
		if(player.y <= 0 || player.y + player.h >= playGround.h){
			player.vy = -player.vy;
			player.y = 0;
		}
			
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
