import { CONSTANTS } from '../../Utils';

export default class SlideBase extends HTMLElement{
  constructor(slide){
    super();
    this.slide = slide;
    this.classList.add('story__item');
  }

  static get observedAttributes() {
    return ['active'];
  }

  _start(timer=CONSTANTS.timer){
    const index = this.getAttribute('data-index');
    const progressBar = this.parentElement.parentElement.getElementsByTagName('progresses-bar')[0];
    progressBar.setDuration(timer);
    progressBar.startProgress(index);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === "active" && newValue === "true"){
      this._start();
    }
  }

  init(){
    this._render();
    this._bindEvents();
  }

  _bindEvents(){
    // this.addEventListener('touchstart', (event) => {event.preventDefault(); this._touchStartItem(this)});
    // this.addEventListener('mousedown', (event) => {event.preventDefault(); this._touchStartItem(this)});
    // this.addEventListener('touchend', (event) => {event.preventDefault(); this._touchEndtItem(this)});
    // this.addEventListener('mouseup', (event) => {event.preventDefault(); this._touchEndtItem(this)});
  }

  _touchStartItem(element){
    console.log('start',element);
  }

  _touchEndtItem(element){
    console.log('end',element);
  }
}
