const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let wallet = localStorage.getItem("pengu_wallet");
let name = localStorage.getItem("pengu_name");

const bg = new Image();
bg.src = "assets/bg.png";

const pengu = new Image();
pengu.src = "assets/pengu.png";

function loop(){
    ctx.clearRect(0,0,900,500);

    ctx.drawImage(bg,0,0,900,500);
    ctx.drawImage(pengu,50,350,80,80);

    ctx.font = "22px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Hoşgeldin: " + name, 20, 40);
    ctx.fillText("Cüzdan: " + wallet, 20, 70);

    requestAnimationFrame(loop);
}

loop();