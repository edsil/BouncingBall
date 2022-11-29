"use strict";
export { Ball };
const g = 2000;
const colors = ['hsl(0,50%,50%)', 'hsl(30,50%,50%)', 'hsl(60,50%,50%)', 'hsl(90,50%,50%)', 'hsl(120,50%,50%)', 'hsl(150,50%,50%)', 'hsl(180,50%,50%)', 'hsl(210,50%,50%)', 'hsl(240,50%,50%)', 'hsl(270,50%,50%)', 'hsl(300,50%,50%)', 'hsl(330,50%,50%)'];


class Ball {
    constructor(x, y, vx = 0, vy = 0, size = 10, mass = 10, ctx, bounciness = 1, color = false) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.mass = mass;
        this.ctx = ctx;
        this.color = (color) ? color : colors[Math.floor(Math.random() * 11)];
        this.bounc = bounciness;
        this.w = ctx.canvas.width;
        this.h = ctx.canvas.height;
        this.cycles = 0;
        this.lastUpdate = 0;
    }

    update(ts) {
        if (this.lastUpdate == 0) this.lastUpdate = ts;
        this.cycles += 1;
        const deltaT = (ts - this.lastUpdate) / 1000;
        this.lastUpdate = ts;
        this.x += this.vx * deltaT;
        this.y += this.vy * deltaT;
        if ((this.x < this.size)) {
            this.vx = Math.abs(this.bounc * this.vx);
            this.x += this.vx * deltaT;
        }
        if ((this.x > (this.w - this.size))) {
            this.vx = -Math.abs(this.bounc * this.vx);
            this.x += this.vx * deltaT;
        }
        if ((this.y < this.size)) {
            this.vy = Math.abs(this.bounc * this.vy);
            this.y += this.vy * deltaT;
        }
        if ((this.y > (this.h - this.size))) {
            this.vy = -Math.abs(this.bounc * this.vy);
            this.y += this.vy * deltaT;
        }
        this.vy += g * deltaT;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

function trim(value, min, max) {
    if (value <= min) return min;
    if (value >= max) return max;
    return value;
}