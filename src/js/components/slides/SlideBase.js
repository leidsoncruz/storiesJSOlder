import { CONSTANTS } from '../../Utils';
import EventEmitter from '../../EventEmitter';

export default class SlideBase extends HTMLElement {
  constructor(slide) {
    super();
    this.slide = slide;
    this.classList.add('story__item');
  }

  static get observedAttributes() {
    return ['active'];
  }

  _start(timer = CONSTANTS.timer) {
    const index = this.getAttribute('data-index');
    const progressBar = this.parentElement.parentElement.getElementsByTagName('progresses-bar')[0];
    progressBar.setDuration(timer);
    progressBar.startProgress(index);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && newValue === 'true') {
      this._start();
    }
  }

  init() {
    this._render();
    this._bindEvents();
  }

  _bindEvents() {
    this.addEventListener('touchstart', event => {
      event.preventDefault(); 
      this._touchStartItem(this);
    });
    this.addEventListener('mousedown', event => {
      event.preventDefault(); 
      this._touchStartItem(this);
    });
    this.addEventListener('touchend', event => {
      event.preventDefault(); 
      this._touchEndtItem(this);
    });
    this.addEventListener('mouseup', event => {
      event.preventDefault(); 
      this._touchEndtItem(this);
    });
  }

  _touchStartItem(element) {
    const storyItems = element.parentElement.parentElement;
    const elements = storyItems.querySelectorAll('btn-prev,btn-next, btn-close, progresses-bar');

    EventEmitter.dispatch('pauseSlide');

    elements.forEach(item => item.style.display = 'none');
  }

  _touchEndtItem(element) {
    const index = this.getAttribute('data-index');
    const progressBar = this.parentElement.parentElement.getElementsByTagName('progresses-bar')[0];
    const widthActiveBar = progressBar.querySelector('.progress-bar[active="true"] > .mybar').style.width;

    const storyItems = element.parentElement.parentElement;
    const elements = storyItems.querySelectorAll('btn-prev,btn-next, btn-close, progresses-bar');

    EventEmitter.dispatch('resumeSlide');

    elements.forEach(item => item.removeAttribute('style'));

    progressBar.startProgress(index, parseInt(widthActiveBar, 10));
  }
}
