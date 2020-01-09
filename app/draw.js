import { canvas, context, inpColor, canvasTop } from '../app.js'
import { funcLocal, getLoalMain } from './localSt.js'

const flagN = {n: 20, draw: false};

const clickCanvasSize = (e) => {
    if(e.target.textContent ==="64x64"){
        canvasTop.width = canvas.width = 64;
        canvasTop.height = canvas.height = 64;
        context.lineWidth = flagN.sizePx;
        flagN.n = 10;
        // funcLocal();
            getLoalMain();
    } else if(e.target.textContent ==="128x128"){
        canvasTop.width = canvas.width = 128;
        canvasTop.height = canvas.height = 128;
        context.lineWidth = flagN.sizePx;
        flagN.n = 5;
        // funcLocal();
            getLoalMain();
    } else if(e.target.textContent ==="32x32"){
        canvasTop.width = canvas.width = 32;
        canvasTop.height = canvas.height = 32;
        context.lineWidth = flagN.sizePx;
        flagN.n = 20;
        // funcLocal();
            getLoalMain();
    }
};

const mousedownDraw = (e) => {
    let x = Math.round(e.layerX / flagN.n);
    let y = Math.round(e.layerY / flagN.n);
    flagN.draw = true;
    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = inpColor.value;
    context.globalCompositeOperation = 'source-over';
};

const mousemoveDraw = (e) => {
    if(flagN.draw == true){
        let x = Math.round(e.layerX  / flagN.n);
        let y = Math.round(e.layerY / flagN.n);
        context.lineWidth % 2 ? context.lineTo(x + .5, y + .5) : context.lineTo(x, y);
        
        context.stroke();
        
    }
};

const mouseupDraw = (e) => {
    let x = Math.round(e.layerX / flagN.n);
    let y = Math.round(e.layerY / flagN.n);
    context.lineWidth % 2 ? context.lineTo(x + .5, y + .5) : context.lineTo(x, y);
    context.stroke();
    // context.closePath();
    flagN.draw = false;
    funcLocal();
};

const clickCanvPx = (e) => {
    let x = Math.round(e.layerX / flagN.n);
    let y = Math.round(e.layerY / flagN.n);
    context.moveTo(x + .5, y + .5);
    context.lineTo(x + .5, y + .5);
    context.stroke();
    context.closePath();
}

export { mousedownDraw, mousemoveDraw, mouseupDraw, clickCanvasSize, flagN, clickCanvPx}