import { rangeFPS } from '../app.js'

let indxImg = 0;
let timer;

const frequencyAnimation = () => {
  if(rangeFPS.value === 0) return;
  let frequency = 1000 / rangeFPS.value;
  return frequency;
}

const animationImage = () => {
  let frequency = frequencyAnimation();
  const framesCanvas = document.querySelectorAll('.canvas1');
  const animated = document.querySelector('.animated');
  const ctxAnimated = animated.getContext('2d');
  ctxAnimated.clearRect(0, 0, animated.width, animated.height);
  ctxAnimated.drawImage(framesCanvas[indxImg = ++indxImg % framesCanvas.length], 0, 0);

  if (timer) {
    clearInterval(timer);
  }
  timer = setTimeout(animationImage, frequency);
  if(rangeFPS.value == 0) {
    clearInterval(timer);
  }
}

export { animationImage, frequencyAnimation }
