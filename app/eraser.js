import { context } from '../app.js'
import { flagN } from './draw.js';
import { funcLocal } from './localSt.js'

// let draw = false
const mousedownEraser = (e) => {
    let x = Math.round(e.layerX / flagN.n);
    let y = Math.round(e.layerY / flagN.n);
    flagN.draw = true;
    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = 'rgba(0,0,0,1)';
    context.globalCompositeOperation = 'destination-out';
};

const mousemoveEraser = (e) => {
    if(flagN.draw == true){
        let x = Math.round(e.layerX  / flagN.n);
        let y = Math.round(e.layerY / flagN.n);
        context.lineWidth % 2 ? context.lineTo(x + .5, y + .5) : context.lineTo(x, y);
        context.stroke();
    }
};

const mouseupEraser = (e) => {
    let x = Math.round(e.layerX / flagN.n);
    let y = Math.round(e.layerY / flagN.n);
    context.lineWidth % 2 ? context.lineTo(x + .5, y + .5) : context.lineTo(x, y);
    context.stroke();
    context.closePath();
    context.strokeStyle = 'rgba(0,0,0,1)';
    funcLocal();
    
    flagN.draw = false;


    // const imageData = canvas.toDataURL();
    // console.log(imageData)
    // localStorage.setItem('myKey', imageData);
    // setTimeout(() => {
    //     if (localStorage.getItem('myKey')) {

    //         const localImg = localStorage.getItem('myKey');
    //         const canwShowWrap = document.querySelector('.preview--active');
    //         const canwShow = canwShowWrap.querySelector('.canvas1');
    //         const ctxt = canwShow.getContext('2d');
    //         const img = new Image();
    //         img.src = localImg;
    //         img.onload = function onl() {
    //             ctxt.drawImage(img, 0, 0, canwShow.width, canwShow.height);
    //         }
    //     }
    // }, 0);
};

export { mousedownEraser, mousemoveEraser, mouseupEraser }
