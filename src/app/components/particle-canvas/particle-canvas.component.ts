import { DOCUMENT } from '@angular/common';
import { Component, Inject, AfterViewInit } from '@angular/core';

export class Particle {
  ctx;
  x;
  y;
  dx;
  dy;
  opacity;
  width;
  height;
  timer;
  interval;
  markedForDeletion;

  constructor(ctx: any, x: any, y: any) {
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

  update(deltaTime: any) {
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

  draw(ctx: any) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'whitesmoke';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

@Component({
  selector: 'app-particle-canvas',
  templateUrl: './particle-canvas.component.html',
  styleUrls: ['./particle-canvas.component.scss'],
})
export class ParticleCanvasComponent implements AfterViewInit {
  canvasId = Math.round(Math.random() * 10);

  canvas: any = undefined;
  ctx: any = undefined;

  x: number = 0;
  y: number = 0;
  particles: Particle[] = [];

  lastTime = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    this.canvas = this.document.getElementById(this.canvasId.toString());

    this.canvas.style.position = 'absolute';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.maxWidth = '100%';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;

    this.ctx = this.canvas.getContext('2d');
    this.setCanvasSize();

    window.addEventListener('mousemove', (e) => {
      let canvasPosition = this.canvas.getBoundingClientRect();
      this.x = e.x - canvasPosition.left;
      this.y = e.y - canvasPosition.top;

      const newParticle = new Particle(this.ctx, this.x, this.y);
      this.particles.push(newParticle);
    });

    window.addEventListener('mouseleave', (e) => {
      this.x = 0;
      this.y = 0;
    });

    window.addEventListener('click', (e) => {
      let canvasPosition = this.canvas.getBoundingClientRect();
      this.x = e.x - canvasPosition.left;
      this.y = e.y - canvasPosition.top;

      for (let i = 0; i < 10; i++) {
        const newParticle = new Particle(this.ctx, this.x, this.y);
        this.particles.push(newParticle);
      }
    });

    window.addEventListener('resize', (e) => {
      this.setCanvasSize();
    });

    window.addEventListener('scroll', (e) => {
      this.setCanvasSize();
    });

    this.startAnimate();
  }

  startAnimate() {
    const animate = (timeStamp: any) => {
      const deltaTime = timeStamp - this.lastTime;
      this.lastTime = timeStamp;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles = this.particles.filter((p) => !p.markedForDeletion);
      this.particles.forEach((particle) => particle.update(deltaTime));
      this.particles.forEach((particle) => particle.draw(this.ctx));

      requestAnimationFrame(animate);
    };

    animate(0);
  }

  setCanvasSize() {
    setTimeout(() => {
      const body = this.document.body;
      const html = this.document.documentElement;
      console.log(body.clientHeight);

      var height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      this.canvas.width = window.innerWidth;
      this.canvas.height = height;
    });
  }
}
