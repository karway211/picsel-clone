import { canvas, context } from '../app.js'

const funcLocal = () => {
    const imageData = canvas.toDataURL();
    localStorage.setItem('myKey', imageData);
    setTimeout(() => {
        const canwShowWrap = document.querySelector('.preview--active');
        const canwShow = canwShowWrap.querySelector('.canvas1');
        const ctxt = canwShow.getContext('2d');
        ctxt.clearRect(0, 0, canwShow.width, canwShow.height);
        if (localStorage.getItem('myKey')) {

            const localImg = localStorage.getItem('myKey');
            const img = new Image();
            img.src = localImg;
            // ctxt.imageSmoothingEnabled = false;
            img.onload = function onl() {
                ctxt.drawImage(img, 0, 0, canwShow.width, canwShow.height);
            }
        }
    }, 0);
}

const funcLocalStart = () => {
    if (localStorage.getItem('myKey')) {

        const localImg = localStorage.getItem('myKey');
        const canwShowWrap = document.querySelector('.preview--active');
        const canwShow = canwShowWrap.querySelector('.canvas1');
        const ctxt = canwShow.getContext('2d');
        const img = new Image();
        img.src = localImg;
        // ctxt.mozImageSmoothingEnabled = false;
        // ctxt.webkitImageSmoothingEnabled = false;
        // ctxt.msImageSmoothingEnabled = false;
        // ctxt.imageSmoothingEnabled = false;
        img.onload = function onl() {
            ctxt.drawImage(img, 0, 0, canwShow.width, canwShow.height);
        }
    }
}

const getLoalMain = () => {
    const localImg = localStorage.getItem('myKey');
    const img = new Image();
    img.src = localImg;
    if (canvas.width === 32) {
        context.imageSmoothingEnabled = true;
    } else {
        context.imageSmoothingEnabled = false;
    }
    // context.mozImageSmoothingEnabled = false;
    // context.webkitImageSmoothingEnabled = false;
    // context.msImageSmoothingEnabled = false;
    // context.imageSmoothingEnabled = false;
    img.onload = function onl() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

export { funcLocal, funcLocalStart, getLoalMain }