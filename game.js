const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

let wallet=localStorage.getItem("pengu_wallet");
let name=localStorage.getItem("pengu_name");

function loop(){
 ctx.clearRect(0,0,900,500);
 ctx.font="24px Arial";
 ctx.fillText("Hoşgeldin: "+name,20,40);
 ctx.fillText("Cüzdan: "+wallet,20,80);
 requestAnimationFrame(loop);
}
loop();