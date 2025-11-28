
const c=document.getElementById("game");
const ctx=c.getContext("2d");

let gravity=0.5;
let player={x:80,y:300,w:32,h:32,vx:0,vy:0,speed:2.5,jump:-10,ground:false};
let cam=0;
let keys={};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);

let pengu=new Image(); pengu.src="assets/pengu_idle.png";
let brick=new Image(); brick.src="assets/brick.png";
let bg=new Image(); bg.src="assets/bg.png";

// 10 düşman
let enemies=[];
for(let i=0;i<10;i++){
  enemies.push({x:500+i*250,y:300,w:32,h:32,dir:i%2==0?1:-1,img:new Image()});
  enemies[i].img.src="assets/enemy_"+(i+1)+".png";
}

function collide(a,b){
 return a.x<a.w+b.x&&a.x+a.w>b.x&&a.y<a.h+b.y&&a.y+a.h>b.y;
}

function update(){

 if(keys["ArrowRight"]) player.vx=player.speed;
 else if(keys["ArrowLeft"]) player.vx=-player.speed;
 else player.vx*=0.8;

 if(keys[" "]&&player.ground){player.vy=player.jump;player.ground=false;}

 player.vy+=gravity;
 player.x+=player.vx;
 player.y+=player.vy;

 if(player.y>300){player.y=300;player.vy=0;player.ground=true;}

 cam=player.x-200;if(cam<0)cam=0;

 enemies.forEach(e=>{
  e.x+=e.dir*1.4;
  if(e.x<200||e.x>4000)e.dir*=-1;
  if(collide(player,e)){
    alert("Öldün! Tekrar dene!");
    location.reload();
  }
 });

 if(player.x>4500){
   alert("Tebrikler! Level tamamlandı!");
   location.reload();
 }
}

function draw(){
 ctx.clearRect(0,0,900,500);

 for(let i=0;i<500;i++) ctx.drawImage(bg,(i*16-cam)%900,0,900,500);
 for(let i=0;i<200;i++) ctx.drawImage(brick,i*32-cam,350,32,32);

 enemies.forEach(e=>ctx.drawImage(e.img,e.x-cam,e.y,32,32));

 ctx.drawImage(pengu,player.x-cam,player.y,32,32);
}

function loop(){update();draw();requestAnimationFrame(loop);}
loop();
