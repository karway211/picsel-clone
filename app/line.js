import { context, inpColor, canvasTop, ctx} from '../app.js';
import { flagN } from './draw.js';
import { funcLocal } from './localSt.js'

function brezLine(x1,y1,x2,y2,ctx){
    let dx = x2 - x1, dy = y2 - y1;
    let sx = (dx > 0) - (dx < 0), sy = (dy > 0) - (dy < 0);
    dx *= sx; dy *= sy;
    ctx.fillStyle = inpColor.value;
    ctx.fillRect(x1, y1, flagN.sizePx || 1, flagN.sizePx || 1);
    if( !(dx || dy) )return;
    let d = 0; let x = x1; let y = y1; let v;
    if(dy < dx)
      for(v = 0 | (dy << 15) / dx * sy; x ^ x2; x += sx, d &= 32767)
      ctx.fillRect(x, y += (d += v) >> 15, flagN.sizePx || 1, flagN.sizePx || 1);
    else
      for(v = 0 | (dx << 15) / dy * sx; y ^ y2; y += sy, d &= 32767)
      ctx.fillRect(x += (d += v) >> 15, y, flagN.sizePx || 1, flagN.sizePx || 1);
};
const started = {};
const mousedownLine = (e) => {
    flagN.draw = true;
    started.x = Math.round(e.layerX / flagN.n);
    started.y = Math.round(e.layerY / flagN.n);
    ctx.beginPath();
    ctx.moveTo(started.x, started.y);
    ctx.strokeStyle = inpColor.value;
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 1;
};
const mousemoveLine = (e) => {
    if (!flagN.draw) {
        return;
    }
    started.x1 = Math.round(e.layerX / flagN.n);
    started.y1 = Math.round(e.layerY / flagN.n);
    ctx.clearRect(0,0,canvasTop.width,canvasTop.height);
        brezLine(started.x,started.y,started.x1,started.y1,ctx);
        ctx.globalCompositeOperation = 'source-over';
}
    
    const mouseupLine = (e) => {
        if (flagN.draw) {
            context.strokeStyle = inpColor.value;
            brezLine(started.x,started.y,started.x1,started.y1,context);
            flagN.draw = false;
            context.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, canvasTop.width, canvasTop.height);
            started.x = started.x1 = started.y = started.y1 = undefined;
            flagN.draw = false;
            funcLocal();
        }
    };
    


export { mousedownLine, mousemoveLine, mouseupLine }
