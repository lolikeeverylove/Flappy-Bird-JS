var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");

var bird=new Image();
var bg=new Image();
var fg=new Image();
var pipeUp=new Image();
var pipeBottom=new Image();

bird.src="img/bird.png";
bg.src="img/bg.png";
fg.src="img/fg.png";
pipeUp.src="img/up.png";
pipeBottom.src="img/bottom.png";

//звуковые файлы
var fly = new Audio();
var scoreAudio = new Audio();

fly.src="audio/fly.mp3";
scoreAudio.src="audio/score.mp3";

var gap=150;

//при нажатии на кнопку
document.addEventListener("keydown",moveUp);
function moveUp(){
yPos-=60;
fly.pause()
fly.currentTime = 0
fly.play()


}

//create blocks
var pipe=[];
pipe[0]={
	x:cvs.width,
	y: 0
}
//счёт
var score=0;

//позиция птички
var xPos=10;
var yPos=150;
var grav=1.8;

function draw() {
    ctx.drawImage(bg,0,0);

	for(var i = 0; i<pipe.length;i++){
    ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
    ctx.drawImage(pipeBottom,pipe[i].x,pipe[i].y+pipeUp.height +gap)

	pipe[i].x--;
	
	if(pipe[i].x==50){
	pipe.push({
		x:cvs.width,
		y:Math.floor((Math.random()*pipeUp.height)-pipeUp.height)
	});
	} 
	if(xPos + bird.width>=pipe[i].x
	&&xPos<=pipe[i].x + pipeUp.width 
	&&(yPos<=pipe[i].y+pipeUp.height
	|| yPos + bird.height>=pipe[i].y+pipeUp.height+gap)
	||yPos + bird.height>=cvs.height-fg.height){
	location.reload();
	}
	if (pipe[i].x==5){
		score++;
		scoreAudio.play();
	}
	}
    ctx.drawImage(fg,0,cvs.height-fg.height);
    ctx.drawImage(bird,xPos,yPos);

    yPos+=grav;
	ctx.fillStyle = "#000";
	ctx.font="24px Verdana";
	ctx.fillText("Счёt: " +score,10,cvs.height-20);
    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;