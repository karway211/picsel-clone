import { context, previewWrapper } from '../app.js'

const frameNumber = () => {
    const frames = document.querySelectorAll('.preview');
    frames.forEach((elem, index) => {
      const frameNumber = elem.querySelector('.number');
      frameNumber.innerText = index + 1;
    });
}

const frameParent = document.querySelector('.preview--wrapper');

const insertFrame = (e) => {
    if (!e.target.parentNode.classList.contains('add--frame')) return;

    const nextChild = document.createElement('div');
    nextChild.classList.add('preview');
    nextChild.setAttribute('draggable', 'true');

    nextChild.innerHTML = `
            <canvas id="canvas1" class="canvas1" width="32" height="32"></canvas>
            <span class="preview--btn number"></span>
            <button class="preview--btn delete"></button>
            <button class="preview--btn copy"></button>
            <button class="preview--btn step"></button>
    `;

    frameParent.appendChild(nextChild);
    frameNumber();
}

const cloneFrame = (e) => {
    if (e.target.classList.contains('copy')) {

        const currentChild = e.target.parentNode;
        const currentNode = e.target.parentNode.querySelector('canvas');
        const imageData = currentNode.toDataURL();
        console.log(e.target.parentNode);
        
        const nextChild = document.createElement('div');
        nextChild.classList.add('preview');
        nextChild.setAttribute('draggable', 'true');

        nextChild.innerHTML = `
                <canvas id="canvas1" class="canvas1" width="32" height="32"></canvas>
                <span class="preview--btn number"></span>
                <button class="preview--btn delete"></button>
                <button class="preview--btn copy"></button>
                <button class="preview--btn step"></button>
        `;
        const nextCanvas = nextChild.querySelector('.canvas1');
        const ctxNextCanvas = nextCanvas.getContext('2d');
        const img = new Image();
        img.src = imageData;
        img.onload = function onl() {
            ctxNextCanvas.drawImage(img, 0, 0, nextCanvas.width, nextCanvas.height);
        }
        frameParent.insertBefore(nextChild, currentChild);
        frameNumber();
    }
}

const deleteFrame = (e) => {
    const parent = document.querySelector('.preview--wrapper');
    if (e.target.classList.contains('delete') && parent.children.length > 1) {
        if(e.target.parentNode.classList.contains('preview--active')) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        e.target.parentNode.remove();
        frameNumber();
    }
}

const frameParentAll = (e) => {

    const frameParentChildren = [...frameParent.children];
    frameParentChildren.forEach((el) => el.classList.remove('preview--active'));
    e.target.parentNode.classList.add('preview--active');
    const canvaNext = e.target.parentNode.querySelector('canvas')
    const imageData = canvaNext.toDataURL();
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = imageData;
    img.onload = function onl() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
};











function moveFrame(e) {
    if (!e.target.classList.contains('step')) return;
    
    console.log(e);
   
}
  

export { insertFrame, deleteFrame, frameParentAll, cloneFrame, moveFrame }