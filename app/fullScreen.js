const fullScreenToggle = () => {
    const animatedWrapper = document.querySelector('.animated--wrapper');
    if (!document.fullscreenElement) {
        animatedWrapper.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
  
export { fullScreenToggle }