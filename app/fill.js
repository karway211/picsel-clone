import { canvas, context, inpColor } from '../app.js'
import { funcLocal } from './localSt.js'

const fillCanvas = () => {
    context.globalCompositeOperation = 'source-over';
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = inpColor.value;
    context.fill();

    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = inpColor.value;
    context.fill();
    funcLocal();
}

export { fillCanvas }