const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const pengu=new Image();
pengu.src="assets/A_2D_digital_illustration_features_a_cartoon_pengu.png";

const enemyImg=new Image();
enemyImg.src="assets/A_pixel_art_illustration_features_a_small,_round_c.png";

const bg=new Image();
bg.src="assets/1000111369.png";

let player={x:80,y:350,w:70,h:70,dy:0,gravity:0.6,jump:-13,ground:false};

let enemies=[{x:600,y:360,w:50,h:50,speed:2}];

let keys={};
document.addEventListener("keydown",e=>keys[e.code]=true);
document.addEventListener("keyup",e=>keys[e.code]=false);

function update(){
 if(keys["ArrowRight"]) player.x+=4;
 if(keys["ArrowLeft"]) player.x-=4;
 if(keys["Space"]&&player.ground){player.dy=player.jump;player.ground=false;}

 player.dy+=player.gravity;
 player.y+=player.dy;

 if(player.y+player.h>=430){
   player.y=430-player.h;
   player.dy=0;
   player.ground=true;
 }
 enemies.forEach(e=>{
   e.x-=e.speed;
   if(e.x<-100) e.x=canvas.width+Math.random()*300;
 });
}

function draw(){
 ctx.drawImage(bg,0,0,canvas.width,canvas.height);
 ctx.drawImage(pengu,player.x,player.y,player.w,player.h);
 enemies.forEach(e=>ctx.drawImage(enemyImg,e.x,e.y,e.w,e.h));
}

function loop(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 update(); draw();
 requestAnimationFrame(loop);
}
loop();