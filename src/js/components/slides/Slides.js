import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';

export default class Slides extends HTMLElement {
  constructor(slides) {
    super();
    this.slides = slides;
    this.classList.add("story__slides");
  }

  init(){
    this._render();
    this._setActiveItem();
  }

  next(){
    const nextSlide = this.activeSlide.nextElementSibling;
    if(nextSlide){
      this.activeSlide.classList.remove('active');
      this.activeSlide.removeAttribute('active');
      this._setActiveItem(nextSlide)
    }else{
      const wrapper = document.querySelector('stories-wrapper');
      wrapper.next();
    }
  }

  _setActiveItem(item=null){
    this.activeSlide = item || this.querySelector('.story__item.active') || this.querySelector('.story__item');
    this.activeSlide.classList.add('active');
    this.activeSlide.setAttribute('active', true);
  }

  _createSlide(slide, index){
    const _slide = slide.type === "video" ? new VideoSlide(slide) : new ImageSlide(slide);
    _slide.setAttribute('data-index', index+1);
    this.appendChild(_slide);
    _slide.init();
  }

  _render(){
    this.slides.map(this._createSlide.bind(this));
  }
}
