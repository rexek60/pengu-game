
const c=document.getElementById("game");
const ctx=c.getContext("2d");

const n=localStorage.getItem("pengu_name");
const w=localStorage.getItem("pengu_wallet");

function loop(){
  ctx.clearRect(0,0,900,500);
  ctx.font="24px Arial";
  ctx.fillText("Hoşgeldin: "+n,20,40);
  ctx.fillText("Cüzdan: "+w,20,80);
  requestAnimationFrame(loop);
}
loop();
