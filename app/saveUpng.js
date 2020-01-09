import { canvas } from '../app.js'

const imageArrayFunc = () => {
    const arrayImages = [];
    const canvasAll = document.querySelectorAll('.canvas1');
    canvasAll.forEach(elem => {
        const canvasN = document.createElement('canvas');
        const ctxCanvasN = canvasN.getContext('2d');
        canvasN.width = 250;
        canvasN.height = 250;
        ctxCanvasN.imageSmoothingEnabled = false;
        ctxCanvasN.drawImage(elem, 0, 0, canvasN.width, canvasN.height);
        const image = ctxCanvasN.getImageData(0, 0, canvasN.width, canvasN.height).data.buffer;
        arrayImages.push(image);
    });
    return arrayImages;
}

export { imageArrayFunc }
