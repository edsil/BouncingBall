"use strict";
import { Ball } from "./ball.js";
const balls = [];
var nBalls = 3000;
const sz = 8;
const mouse = { left: false, right: false, x: 0, y: 0 };
var canvas, ctx;
var h, w;
var startTimer = 0;
var lastUpdateTimer = 0;
var frame = 0;
var momentTimer = 0;
var momentFrame = 0;
var fps;
var momentFPS = 0;

window.onload = function () {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "1px";
    canvas = document.createElement("canvas");
    document.getElementById("btn").onclick = goAgain;
    ctx = canvas.getContext("2d");
    canvas.style.border = "1px solid black";
    document.body.appendChild(canvas);
    h = window.innerHeight;
    w = window.innerWidth;
    ctx.canvas.height = h - 5;
    ctx.canvas.width = w - 5;
    addEvents();
    addBalls(nBalls);
    startTimer = performance.now();
    lastUpdateTimer = startTimer;
    momentTimer = startTimer;
    requestAnimationFrame(updateDraw);
};

function goAgain() {
    startTimer = 0;
    lastUpdateTimer = 0;
    frame = 0;
    momentTimer = 0;
    momentFrame = 0;
    fps = 0;
    momentFPS = 0;
    const elem = document.getElementById("nballs");
    nBalls = +elem.value;
    balls.length = 0;
    addBalls(nBalls);
    startTimer = performance.now();
    lastUpdateTimer = startTimer;
    momentTimer = startTimer;
}

function addBalls(n) {
    for (var i = 0; i < n; i++) {
        const x = (Math.cos(6 * Math.PI * i / n) * (w - sz * 4) / 2) + w / 2; //100 + Math.random() * (w - 200);
        const y = (Math.sin(12 * Math.PI * i / n) * (h - sz * 4) / 2) + h / 2; //100 + Math.random() * (h - 200);
        const vx = x;
        const vy = y;
        const ba = new Ball(x, y, 0, ((h - y) * 2) % 145, sz, 50, ctx, 0.998);
        balls.push(ba);
    }
}

function addEvents() {
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);
    window.addEventListener("keyup", keyup);
    window.addEventListener('resize', () => {
        h = window.innerHeight;
        w = window.innerWidth;
        ctx.canvas.height = h - 5;
        ctx.canvas.width = w - 5;
    });
}

function trim(value, min, max) {
    if (value <= min) return min;
    if (value >= max) return max;
    return value;
}

function updateDraw(ts) {
    frame += 1;
    if ((ts - momentTimer) > 1000) {
        momentFPS = Math.round(1000 * (frame - momentFrame) / (ts - momentTimer));
        momentFrame = frame;
        momentTimer = ts;
    }
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < balls.length; i++) {
        balls[i].update(ts);
        balls[i].draw();
    }

    var boxWidth = 0;
    const txt = [];
    fps = Math.round(1000 * frame / (ts - startTimer));

    txt.push("FPS: " + fps);
    txt.push("Last Second FPS: " + Math.round(momentFPS));
    txt.push("Total Frames: " + ((frame < 1000) ? (frame) : (Math.round(frame / 1000) + "k")));
    txt.push("Seconds: " + Math.round((ts - startTimer) / 1000));
    txt.push("Balls: " + balls.length)
    for (const t of txt) boxWidth = Math.max(boxWidth, t.length);
    var boxHeight = txt.length;
    var lettSize = 15;
    ctx.clearRect(5, 3, lettSize * boxWidth / 2, lettSize * boxHeight);
    ctx.fillStyle = 'black';
    ctx.font = "15px Arial";
    txt.forEach(function (t, i) {
        ctx.fillText(t, lettSize / 2, lettSize + i * lettSize);
    });
    requestAnimationFrame(updateDraw);
}

function keyup(e) {
    if (e.code == "Digit1") {
        null;
    }
}

function mouseDown(event) {
    updateMousePos(event);
    mouse.left = event.button === 0 ? true : mouse.left;
    mouse.right = event.button === 2 ? true : mouse.right;
}

function mouseUp(event) {
    updateMousePos(event);
    mouse.left = event.button === 0 ? false : mouse.left;
    mouse.right = event.button === 2 ? false : mouse.right;
}

function mouseMove(event) {
    event.preventDefault();
    updateMousePos(event);
}

function updateMousePos(event) {
    mouse.x = event.clientX - canvas.offsetLeft;
    mouse.y = event.clientY - canvas.offsetTop;
}