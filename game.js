const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ----- LOAD GRAPHICS -----
const pengu = new Image();
pengu.src = "assets/A_2D_digital_illustration_features_a_cartoon_pengu.png";

const enemyImg = new Image();
enemyImg.src = "assets/A_pixel_art_illustration_features_a_small,_round_c.png";

const bg = new Image();
bg.src = "assets/1000111369.png";

// ----- PLAYER -----
let player = {
    x: 100,
    y: 350,
    w: 70,
    h: 70,
    dy: 0,
    gravity: 0.5,
    jumpForce: -10,
    grounded: false
};

// ----- ENEMIES -----
let enemies = [
    { x: 600, y: 360, w: 50, h: 50, speed: 2 }
];

// ----- INPUT -----
let keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// MOBILE TOUCH
let touchX = null;

canvas.addEventListener("touchstart", e => {
    touchX = e.touches[0].clientX;
});

canvas.addEventListener("touchend", () => {
    touchX = null;
});

function handleMobile() {
    if (touchX === null) return;

    if (touchX < canvas.width / 3) player.x -= 4;
    else if (touchX > canvas.width * 2 / 3) player.x += 4;
    else if (player.grounded) {
        player.dy = player.jumpForce;
        player.grounded = false;
    }
}

// ----- UPDATE PLAYER -----
function updatePlayer() {
    if (keys["ArrowLeft"]) player.x -= 4;
    if (keys["ArrowRight"]) player.x += 4;

    if (keys["Space"] && player.grounded) {
        player.dy = player.jumpForce;
        player.grounded = false;
    }

    handleMobile();

    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y + player.h >= 420) {
        player.y = 420 - player.h;
        player.dy = 0;
        player.grounded = true;
    }
}

// ----- DRAW FUNCTIONS -----
function drawBackground() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.drawImage(pengu, player.x, player.y, player.w, player.h);
}

function drawEnemies() {
    enemies.forEach(e => {
        ctx.drawImage(enemyImg, e.x, e.y, e.w, e.h);
        e.x -= e.speed;

        if (e.x < -100)
            e.x = canvas.width + Math.random() * 300;
    });
}

// ----- MAIN LOOP -----
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    updatePlayer();
    drawPlayer();
    drawEnemies();

    requestAnimationFrame(loop);
}

loop();
