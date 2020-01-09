import { rangeFPS } from '../app.js'

const valueFPS = () => {
    const fpsValue = document.querySelector('.display--number');
    fpsValue.innerText = rangeFPS.value;
    return rangeFPS.value;
}

export { valueFPS, rangeFPS }
