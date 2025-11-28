const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gravity = 0.5;
let friction = 0.8;

let player = {
    x: 80,
    y: 300,
    w: 32,
    h: 32,
    vx: 0,
    vy: 0,
    speed: 2.5,
    jumpForce: -10,
    grounded: false
};

let camX = 0;
let keys={};

document.addEventListener("keydown",e=>keys[e.key]=true);
document.addEventListener("keyup",e=>keys[e.key]=false);

let pengu_idle=new Image(); pengu_idle.src="assets/pengu_idle.png";
let enemyImg=new Image(); enemyImg.src="assets/enemy_snow_1.png";
let bg=new Image(); bg.src="assets/bg.png";

let tiles={};
tiles.brick=new Image(); tiles.brick.src="assets/brick_tile.png";
tiles.ice=new Image(); tiles.ice.src="assets/ice_tile.png";

let enemies=[
 {x:400,y:300,w:32,h:32,dir:1},
 {x:900,y:300,w:32,h:32,dir:-1}
];

function rectCollide(a,b){
 return a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y;
}

function update(){
 if(keys["ArrowRight"]) player.vx=player.speed;
 else if(keys["ArrowLeft"]) player.vx=-player.speed;
 else player.vx*=friction;

 if(keys[" "] && player.grounded){
    player.vy=player.jumpForce;
    player.grounded=false;
 }

 player.vy+=gravity;
 player.x+=player.vx;
 player.y+=player.vy;

 if(player.y>300){
   player.y=300;
   player.vy=0;
   player.grounded=true;
 }

 camX=player.x-200;
 if(camX<0) camX=0;

 enemies.forEach(e=>{
   e.x+=e.dir*1.2;
   if(e.x<200 || e.x>2000) e.dir*=-1;
   if(rectCollide(player,e)){
     alert("ÖLDÜN! Yeniden başla!");
     location.reload();
   }
 });

 let queen={x:3500,y:300,w:32,h:32};
 if(rectCollide(player,queen)){
   alert("TEBRİKLER! QUEEN PENGU'YU KURTARDIN! +1 PENGU");
   location.reload();
 }
}

function draw(){
 ctx.clearRect(0,0,900,500);

 for(let i=0;i<200;i++)
   ctx.drawImage(bg,(i*16-camX),0,32,32);

 for(let i=0;i<120;i++)
   ctx.drawImage(tiles.brick,(i*32-camX),350,32,32);

 enemies.forEach(e=>ctx.drawImage(enemyImg,e.x-camX,e.y,32,32));

 let queen=new Image(); queen.src="assets/queen.png";
 ctx.drawImage(queen,3500-camX,300,32,32);

 ctx.drawImage(pengu_idle,player.x-camX,player.y,32,32);
}

function loop(){ update(); draw(); requestAnimationFrame(loop); }
loop();