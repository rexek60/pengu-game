const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let pengu = { x:100, y:100, vx:0, vy:0, w:40, h:40 };
let gravity = 0.5;
let keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function update(){
    pengu.vx = 0;
    if(keys["ArrowLeft"])  pengu.vx = -4;
    if(keys["ArrowRight"]) pengu.vx = 4;
    if(keys["Space"] && pengu.y >= 500) pengu.vy = -10;

    pengu.vy += gravity;
    pengu.y += pengu.vy;
    pengu.x += pengu.vx;

    if(pengu.y > 500){ pengu.y = 500; pengu.vy = 0; }

    draw();
    requestAnimationFrame(update);
}

function draw(){
    ctx.fillStyle = "#8bd3ff";
    ctx.fillRect(0,0,900,600);

    ctx.fillStyle = "#a0522d";
    for(let i=0;i<20;i++) ctx.fillRect(i*45,540,40,40);

    ctx.fillStyle = "blue";
    ctx.fillRect(pengu.x,pengu.y,pengu.w,pengu.h);
}

update();