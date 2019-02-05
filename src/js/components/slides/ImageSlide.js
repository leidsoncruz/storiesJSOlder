import SlideBase from './SlideBase';

export default class ImageSlide extends SlideBase {
  _render() {
    this.innerHTML = `<img src=${this.slide.src} /> <span>${this.slide.title}</span>`;
  }
}
