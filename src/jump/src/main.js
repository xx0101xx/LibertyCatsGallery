var c = document.createElement("canvas");
var ctx = c.getContext("2d");

// var screenWidth = 500;
// var screenHeight = 800;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

c.width = screenWidth;
c.height = screenHeight;
document.body.appendChild(c);

function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ["android", "iphone", "ipad", "ipod", "windows phone"];
  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
}
if (isMobile()) {
  window.addEventListener("touchstart", this.keydown, false);
  window.addEventListener("touchend", this.keyup, false);
} else {
  window.addEventListener("keydown", this.keydown, false);
  window.addEventListener("keyup", this.keyup, false);
}

//Variables
const gravity = 0.34;
var holdingLeftKey = false;
var holdingRightKey = false;

var keycode;
var dead = false;
var difficulty = 0;
var lowestBlock = 0;
var score = 0;
var yDistanceTravelled = 0;

var blocks = [];
var powerups = [];

//Time variables
var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

function handleBlocks() {
  blocks.push(new block());
  blocks[0].x = screenWidth / 2 - 30;
  blocks[0].y = screenHeight - 50;
  blocks[0].monster = 0;
  blocks[0].type = 0;
  blocks[0].powerup = 0;

  // 确保前几个方块不会生成怪物，给玩家一个良好的开始
  for (var j = 1; j <= 5; j++) {
    if (blocks[j]) {
      blocks[j].monster = 0;
    }
  }
  
  blockSpawner();
}
function keydown(e) {
  if (isMobile()) {
    const leftInstance = e.targetTouches[0].clientX;
    if (leftInstance < screenWidth / 2) {
      holdingLeftKey = true;
      console.log("keydown--左", leftInstance, screenWidth);
    } else {
      holdingRightKey = true;
      console.log("keydown--右", leftInstance, screenWidth);
    }
  } else {
    if (e.keyCode === 65) {
      // A key
      holdingLeftKey = true;
    } else if (e.keyCode === 68) {
      // D key
      holdingRightKey = true;
    }
  }

  if (dead && (isMobile() || e.keyCode === 82)) {
    // R key
    blocks = [];
    lowestBlock = 0;
    difficulty = 0;
    score = 0;
    yDistanceTravelled = 0;
    player.springBootsDurability = 0;

    handleBlocks();

    player.x = screenWidth / 2 - 30;
    player.y = screenHeight - 150;

    dead = false;
  }
}

function keyup(e) {
  if (isMobile()) {
    // console.log("keyup", e);
    holdingLeftKey = false;
    holdingRightKey = false;
  } else {
    if (e.keyCode === 65) {
      holdingLeftKey = false;
    } else if (e.keyCode === 68) {
      holdingRightKey = false;
    }
  }
}

function showScore() {
  if (yDistanceTravelled > score) {
    score = Math.round(yDistanceTravelled / 100);
  }

  ctx.font = "36px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(score, 15, 40);
}

handleBlocks();

function loop() {
  requestAnimationFrame(loop);

  //This sets the FPS to 60
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    var backgroundImage = new Image();
    backgroundImage.src = "Sprites/background.png";
    ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight);

    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i] !== 0) {
        blocks[i].update();
        blocks[i].draw();
      }
    }

    player.update();
    player.draw();

    showScore();

    ctx.fill();
    then = now - (delta % interval);
  }
}

loop();
