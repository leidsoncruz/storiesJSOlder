import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';
import EventEmitter from '../../EventEmitter';

export default class Slides extends HTMLElement {
  constructor(slides) {
    super();
    this.slides = slides;
    this.classList.add("story__slides");
  }

  init(){
    this._render();
    this._bindCustomEvents();
    this._setActiveItem();
  }

  prev(){
    EventEmitter.dispatch('previousSlide');
  }

  next(){
    EventEmitter.dispatch('nextSlide');
  }

  _deactiveActualSlide() {
    if (this.activeSlide) {
      this.activeSlide.classList.remove('active');
      this.activeSlide.removeAttribute('active');
    }
  }

  _setActiveItem(item=null){
    this._deactiveActualSlide();
    this.activeSlide = item || this.querySelector('.story__item.active') || this.querySelector('.story__item');
    this.activeSlide.classList.add('active');
    this.activeSlide.setAttribute('active', true);
    EventEmitter.dispatch('activeSlide');
  }

  _createSlide(slide, index){
    const _slide = slide.type === "video" ? new VideoSlide(slide) : new ImageSlide(slide);
    _slide.setAttribute('data-index', index+1);
    this.appendChild(_slide);
    _slide.init();
  }

  _onNextSlide() {
    const nextSlide  = this.activeSlide.nextElementSibling;

    if (nextSlide) {
      const progressesBar = this.parentElement.querySelector('progresses-bar');
      progressesBar.removeActiveBar();
      this._setActiveItem(nextSlide);
    } else {
      const wrapper = document.querySelector('stories-wrapper');
      wrapper.next();
    }
  }

  _onPreviousSlide() {
    const previousSlide = this.activeSlide.previousElementSibling;

    if(previousSlide){
      this._setActiveItem(previousSlide);
    }else{
      const wrapper = document.querySelector('stories-wrapper');
      wrapper.prev();
    }
  }

  _bindCustomEvents() {
    EventEmitter.clear('nextSlide', 'previousSlide');

    EventEmitter.on('nextSlide', this._onNextSlide.bind(this));
    EventEmitter.on('previousSlide', this._onPreviousSlide.bind(this));
  }

  _render(){
    this.slides.map(this._createSlide.bind(this));
  }
}
