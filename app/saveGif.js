import { canvas } from '../app.js'
const framesToImg = () => {
    const canvasAll = document.querySelectorAll('.canvas1');
    const images = [];
    canvasAll.forEach((elem) => {
        const canvasN = document.createElement('canvas');
        const ctxCanvasN = canvasN.getContext('2d');
        canvasN.width = 250;
        canvasN.height = 250;
        ctxCanvasN.fillStyle = 'rgba(230, 230, 230, .7)';
        ctxCanvasN.fillRect(0, 0, canvasN.width, canvasN.height);
        ctxCanvasN.imageSmoothingEnabled = false;
        ctxCanvasN.drawImage(elem, 0, 0, canvasN.width, canvasN.height);
        images.push(canvasN.toDataURL());
    });
    return images;
}

export { framesToImg }
