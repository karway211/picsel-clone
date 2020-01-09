import { mousedownDraw, mousemoveDraw, mouseupDraw, clickCanvasSize, clickCanvPx, flagN } from './app/draw.js';
import { mousedownLine, mousemoveLine, mouseupLine } from './app/line.js'
import { mousedownEraser, mousemoveEraser, mouseupEraser } from './app/eraser.js'
import { floodFill } from './app/bucket.js'
import { fillCanvas } from './app/fill.js'
import { insertFrame, deleteFrame, frameParentAll, cloneFrame, moveFrame } from './app/frames.js'
import { funcLocalStart, getLoalMain } from './app/localSt.js'
import { valueFPS } from './app/rangefps.js'
import { animationImage } from './app/frameShow.js'
import { fullScreenToggle } from './app/fullScreen.js'
// localStorage.clear()
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
 context.lineWidth = flagN.sizePx || 1;

if (localStorage.getItem('myKey')) {
    getLoalMain();
}
funcLocalStart();

const canvasTop = document.createElement('canvas');
const ctx = canvasTop.getContext('2d');

canvasTop.classList.add('canvasTop');
canvasTop.width = canvasTop.height = canvas.height;

const wrapperCanvas = document.querySelector('.wrapper--canvas');
wrapperCanvas.appendChild(canvasTop);
canvasTop.style.display = 'none';

let tools = 'pen';
const inpColor = document.querySelector('.current--color');
const prevColor = document.querySelector('.prev--color');


context.strokeStyle = inpColor.value;
ctx.strokeStyle = inpColor.value;
inpColor.addEventListener('change', () => {context.strokeStyle = inpColor.value;}, false);
document.addEventListener('click', (e) => {
    if (e.target.className === "rotate") {
        const col = inpColor.value;
        inpColor.value = prevColor.value;
        prevColor.value = col;
    }
});
document.addEventListener('click', clickCanvasSize);


const rangeFPS = document.querySelector('.range--fps');
rangeFPS.addEventListener("input", valueFPS);

document.addEventListener('click', (e) => {
    if (e.target.value === 'pen') {
        tools = 'pen';
        canvasTop.style.display = 'none';
    }
    if (e.target.value === 'eraser') {
        tools = 'eraser';
        canvasTop.style.display = 'none';
    }
    if (e.target.value === 'stroke') {
        tools = 'stroke';
        canvasTop.style.display = 'block';
    }
    if (e.target.value === 'bucket') {
        tools = 'bucket';
        canvasTop.style.display = 'none';
    }
    if (e.target.value === 'allpx') {
        tools = 'allpx';
        canvasTop.style.display = 'none';
    }
    if (e.target.value === '2l') flagN.sizePx = context.lineWidth = 2;
    if (e.target.value === '3l') flagN.sizePx = context.lineWidth = 3;
    if (e.target.value === '4l') flagN.sizePx = context.lineWidth = 4;
    if (e.target.value === '1l') flagN.sizePx = context.lineWidth = 1;
    if (e.target.textContent === "Add new frame") insertFrame(e);
    if (e.target.classList.contains('delete')) deleteFrame(e);
    if(e.target.parentNode.classList.contains('preview') && !e.target.classList.contains('delete')) frameParentAll(e);
});

canvas.addEventListener("mousedown", (e) => {
    if (tools === 'pen')  mousedownDraw(e);
    if (tools === 'eraser')  mousedownEraser(e);
    if (tools === 'stroke') mousedownLine(e);
});
canvasTop.addEventListener("mousedown", (e) => {
    if (tools === 'stroke') mousedownLine(e);
});
canvas.addEventListener("mousemove", (e) => {
    if (tools === 'pen')  mousemoveDraw(e);
    if (tools === 'eraser')  mousemoveEraser(e);
    if (tools === 'stroke') mousemoveLine(e);
});
canvasTop.addEventListener("mousemove", (e) => {
    if (tools === 'stroke') mousemoveLine(e);
});
canvas.addEventListener("mouseup", (e) => {
    if (tools === 'pen')  mouseupDraw(e);
    if (tools === 'eraser')  mouseupEraser(e);
    if (tools === 'stroke') mouseupLine(e);
});
canvasTop.addEventListener("mouseup", (e) => {
    if (tools === 'stroke') mouseupLine(e);
});

canvas.addEventListener('mousedown', clickCanvPx);
canvas.addEventListener('click', (e) => {
    if (tools === 'bucket')  floodFill(e);
    if (tools === 'allpx') {
        if (e.target.id === 'canvas')  fillCanvas();
    }


});

const animatedBtn = document.querySelector('.animated--btn');
animatedBtn.addEventListener('click', fullScreenToggle);

canvas.addEventListener('mouseup', animationImage);
rangeFPS.addEventListener("input", animationImage);

const previewWrapper = document.querySelector('.preview--wrapper');
previewWrapper.addEventListener('click', cloneFrame);
animationImage();

export { canvas,
        context,
        inpColor,
        canvasTop,
        ctx,
        flagN,
        rangeFPS,
        previewWrapper
    }