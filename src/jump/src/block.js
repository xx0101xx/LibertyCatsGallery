function block() {
  this.x;
  this.y;
  this.width = 80;
  this.height = 10;
  this.powerup;
  this.type;
  this.monster;
  this.direction = "right";
  this.moveTime = 10;

  this.draw = function () {
    if (this.type === "break") {
      ctx.fillStyle = "#ee0a24";
    } else if (this.type === "sideways") {
      ctx.fillStyle = "#fffbe8";
    } else {
      ctx.fillStyle = "#ed6a0c";
    }

    if (this.monster === 0) {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      monsterFunctions[this.monster].draw(this.x, this.y);
    }

    if (this.powerup === "spring") {
      //   ctx.fillStyle = "grey";
      //   ctx.fillRect(this.x + 25, this.y - 10, 30, 10);
      var img = new Image();
      var blockX = this.x;
      var blockY = this.y;
      img.src = "Sprites/Monsters/spring.png";
      img.onload = function () {
        ctx.drawImage(img, blockX + 20, blockY - 25, 40, 30);
      };
    } else if (this.powerup === "springBoots") {
      var img = new Image();
      var blockX = this.x;
      var blockY = this.y;
      img.src = "Sprites/Monsters/shoe.png";
      img.onload = function () {
        ctx.drawImage(img, blockX + 20, blockY - 32, 35, 35);
      };
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.x + 30, this.y - 25, 15, 10);
      // ctx.fillRect(this.x + 53, this.y - 25, 15, 10);
      // ctx.fillStyle = "grey";
      // ctx.fillRect(this.x + 30, this.y - 15, 15, 15);
      // ctx.fillRect(this.x + 53, this.y - 15, 15, 15);
    }
  };

  this.update = function () {
    if (this.type === "sideways") {
      if (this.x >= screenWidth - this.width) {
        this.direction = "left";
      } else if (this.x <= 0) {
        this.direction = "right";
      }

      if (this.direction === "right") {
        this.x += 2.5;
      } else {
        this.x -= 2.5;
      }
    }

    if (this.monster === "smallRed") {
      if (this.direction === "right") {
        this.x += 1;
        this.moveTime -= 1;

        if (this.moveTime === 0) {
          this.direction = "left";
          this.moveTime = 10;
        }
      } else {
        this.x -= 1;
        this.moveTime -= 1;

        if (this.moveTime === 0) {
          this.direction = "right";
          this.moveTime = 10;
        }
      }
    }
  };
}
