export class Particle {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x + Math.random() * 20 - 10;
    this.y = y + Math.random() * 20 - 10;

    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;

    this.opacity = 1;

    this.width = 2;
    this.height = 2;

    this.timer = 0;
    this.interval = 10; // ms
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    if (this.timer > this.interval) {
      this.timer = 0;
      this.x += this.dx;
      this.y += this.dy;
      this.opacity -= 0.03;
      if (this.opacity <= 0) {
        this.opacity = 0;
        this.markedForDeletion = true;
      }
    } else {
      this.timer += deltaTime;
    }
  }

  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "whitesmoke";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
