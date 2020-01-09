import { rangeFPS } from '../app.js'

const valueFPS = () => {
    const fpsValue = document.querySelector('.display--number');
    fpsValue.innerText = rangeFPS.value;
    return fpsValue;
}

export { valueFPS, rangeFPS }
