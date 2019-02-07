import  { EVENTS } from '../../Utils';
import EventEmitter from '../../EventEmitter';
import ImageSlide from './ImageSlide';
import VideoSlide from './VideoSlide';

export default class Slides extends HTMLElement {
  constructor(slides) {
    super();
    this.slides = slides;
    this.classList.add('story__slides');

    this._onActiveItem = this._onActiveItem.bind(this);
    this._onNextSlide = this._onNextSlide.bind(this);
    this._onPreviousSlide = this._onPreviousSlide.bind(this);
  }

  get previousSlide() {
    return this.activeSlide.previousElementSibling;
  }

  get nextSlide() {
    return this.activeSlide.nextElementSibling;
  }

  init() {
    this._render();
    this._bindCustomEvents();

    EventEmitter.dispatch(EVENTS.activateSlide, null);
  }

  _deactiveActualSlide() {
    if (this.activeSlide) {
      this.activeSlide.classList.remove('active');
      this.activeSlide.removeAttribute('active');
    }
  }

  _onActiveItem({ detail }) {
    this._deactiveActualSlide();
    this.activeSlide = detail || this.querySelector('.story__item.active') || this.querySelector('.story__item');
    this.activeSlide.classList.add('active');
    this.activeSlide.setAttribute('active', true);
  }

  _createSlide(slide, index) {
    const _slide = slide.type === 'video' ? new VideoSlide(slide) : new ImageSlide(slide);
    _slide.setAttribute('data-index', index + 1);
    this.appendChild(_slide);
    _slide.init();
  }

  _onNextSlide() {
    if (this.nextSlide) {
      EventEmitter.dispatch(EVENTS.removeProgress);
      EventEmitter.dispatch(EVENTS.activateSlide, this.nextSlide);
    } else {
      EventEmitter.dispatch(EVENTS.nextStory);
    }
  }

  _onPreviousSlide() {
    if (this.previousSlide) {
      EventEmitter.dispatch(EVENTS.activateSlide, this.previousSlide);
    } else {
      EventEmitter.dispatch(EVENTS.previousStory);
    }
  }

  _unbindCustomEvents() {
    EventEmitter.off(EVENTS.activateSlide, this._onActiveItem);
    EventEmitter.off(EVENTS.nextSlide, this._onNextSlide);
    EventEmitter.off(EVENTS.previousSlide, this._onPreviousSlide);
  }

  _bindCustomEvents() {
    this._unbindCustomEvents();
    EventEmitter.on(EVENTS.activateSlide, this._onActiveItem);
    EventEmitter.on(EVENTS.nextSlide, this._onNextSlide);
    EventEmitter.on(EVENTS.previousSlide, this._onPreviousSlide);
  }

  _render() {
    this.slides.map(this._createSlide.bind(this));
  }
}
