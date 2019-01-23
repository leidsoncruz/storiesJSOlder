import { SlideImage, SlideVideo } from './Slide';

export default class Slides extends HTMLElement {
  constructor(slides) {
    super();
    this.slides = slides;
    this.classList.add("story__slides");
    this._render();
  }

  _createSlide(slide){
    const _slide = slide.type === "video" ? new SlideVideo(slide) : new SlideImage(slide);
    this.appendChild(_slide);
  }

  _render(){
    this.slides.map(this._createSlide.bind(this));
  }
}
