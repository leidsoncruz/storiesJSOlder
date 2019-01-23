import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';

export default class Slides extends HTMLElement {
  constructor(slides) {
    super();
    this.slides = slides;
    this.classList.add("story__slides");
    // this._setActiveItem();
  }

  _init(){
    this._render();
    this._setActiveItem();
  }

  _setActiveItem(){
    this.activeSlide = this.querySelector('.story__item.active') || this.querySelector('.story__item');
    this.activeSlide.classList.add('active');
    this.activeSlide.setAttribute('active', true);
  }

  _createSlide(slide, index){
    const _slide = slide.type === "video" ? new VideoSlide(slide) : new ImageSlide(slide);
    _slide.setAttribute('data-index', index+1);
    this.appendChild(_slide);
    _slide._init();
  }

  _render(){
    this.slides.map(this._createSlide.bind(this));
  }
}
