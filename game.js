const c=document.getElementById("game");
const ctx=c.getContext("2d");

let bg=new Image(); bg.src="assets/background.png";
let pengu=new Image(); pengu.src="assets/pengu.png";

function loop(){
 ctx.clearRect(0,0,900,500);
 ctx.drawImage(bg,0,0,900,500);
 ctx.drawImage(pengu,100,350,64,64);

 ctx.font="24px Arial";
 ctx.fillStyle="black";
 ctx.fillText("Hoşgeldin: "+localStorage.getItem("pengu_name"),20,40);
 ctx.fillText("Cüzdan: "+localStorage.getItem("pengu_wallet"),20,80);

 requestAnimationFrame(loop);
}
pengu.onload=loop;
