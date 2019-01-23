import SlideBase from './SlideBase';

export default class VideoSlide extends SlideBase {
  _render(){
    this.innerHTML = `<video src="${this.slide.src}" preload="auto"></video>`;
  }
}
