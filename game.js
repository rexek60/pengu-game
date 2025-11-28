const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;

const imgPengu = new Image();
imgPengu.src = "assets/pengu.png";
const imgTile = new Image();
imgTile.src = "assets/tile.png";
const imgBg = new Image();
imgBg.src = "assets/bg.png";

const gravity = 0.6;
const friction = 0.8;

const player = {
  x: 80,
  y: 0,
  w: 32,
  h: 32,
  vx: 0,
  vy: 0,
  speed: 3,
  jumpForce: -12,
  onGround: false
};

let cameraX = 0;
let keys = {};

document.addEventListener("keydown", e => {
  keys[e.key] = true;
  if(e.key === " " || e.key === "Spacebar"){
    e.preventDefault();
  }
});
document.addEventListener("keyup", e => {
  keys[e.key] = false;
});

const TILE_SIZE = 32;
const LEVEL_LENGTH = 120;
const tiles = [];

for(let i=0;i<LEVEL_LENGTH;i++){
  tiles.push({ x:i*TILE_SIZE, y:H-64, w:TILE_SIZE, h:32 });
}

tiles.push({x:10*TILE_SIZE, y:H-160, w:TILE_SIZE*3, h:32});
tiles.push({x:20*TILE_SIZE, y:H-200, w:TILE_SIZE*2, h:32});
tiles.push({x:35*TILE_SIZE, y:H-180, w:TILE_SIZE*4, h:32});

function rectsCollide(a,b){
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

function updatePlayer(){
  if(keys["ArrowRight"] || keys["d"]){
    player.vx = player.speed;
  } else if(keys["ArrowLeft"] || keys["a"]){
    player.vx = -player.speed;
  } else {
    player.vx *= friction;
  }

  if((keys[" "] || keys["ArrowUp"] || keys["w"]) && player.onGround){
    player.vy = player.jumpForce;
    player.onGround = false;
  }

  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;

  if(player.y > H){
    player.x = 80;
    player.y = 0;
    player.vx = 0;
    player.vy = 0;
  }

  player.onGround = false;
  const pRect = {x:player.x, y:player.y, w:player.w, h:player.h};

  for(const t of tiles){
    if(t.x + t.w < cameraX - 100 || t.x > cameraX + W + 100) continue;
    const r = {x:t.x, y:t.y, w:t.w, h:t.h};
    if(rectsCollide(pRect,r)){
      if(player.vy > 0 && player.y + player.h - player.vy <= t.y){
        player.y = t.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }else if(player.vy < 0 && player.y >= t.y + t.h){
        player.y = t.y + t.h;
        player.vy = 0;
      }else{
        if(player.vx > 0){
          player.x = t.x - player.w;
        }else if(player.vx < 0){
          player.x = t.x + t.w;
        }
        player.vx = 0;
      }
      pRect.x = player.x;
      pRect.y = player.y;
    }
  }

  cameraX = player.x - W/2 + player.w/2;
  if(cameraX < 0) cameraX = 0;
  const maxCam = LEVEL_LENGTH*TILE_SIZE - W;
  if(cameraX > maxCam) cameraX = maxCam;
}

function draw(){
  ctx.fillStyle = "#87CEFA";
  ctx.fillRect(0,0,W,H);

  for(let x=-32;x<W+32;x+=32){
    for(let y=-32;y<H;y+=32){
      ctx.drawImage(imgBg,x,y,64,64);
    }
  }

  for(const t of tiles){
    const sx = t.x - cameraX;
    if(sx + t.w < -50 || sx > W+50) continue;
    ctx.drawImage(imgTile,sx,t.y,t.w,t.h);
  }

  const px = player.x - cameraX;
  ctx.drawImage(imgPengu,px,player.y,player.w,player.h);

  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(10,10,160,32);
  ctx.fillStyle = "#fff";
  ctx.font = "14px system-ui";
  ctx.fillText("X: "+Math.floor(player.x),20,32);
}

function loop(){
  updatePlayer();
  draw();
  requestAnimationFrame(loop);
}

loop();
