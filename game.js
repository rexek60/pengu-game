const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

let pengu=new Image();
pengu.src="assets/pengu.png";

function loop(){
    ctx.clearRect(0,0,900,500);
    ctx.drawImage(pengu,100,300,80,80);
    requestAnimationFrame(loop);
}
pengu.onload = loop;
