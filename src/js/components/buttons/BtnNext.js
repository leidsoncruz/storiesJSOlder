import EventEmitter from '../../EventEmitter';

export default class ButtonNext extends HTMLElement {
  constructor(){
    super();
    this.classList.add('btn-next');
    this.addEventListener('click', this._onPressNext.bind(this));
  }

  _onPressNext(){
    const progressesBar = this.parentElement.querySelector('progresses-bar');
    progressesBar.toEnd();
    EventEmitter.dispatch('nextSlide');
  }
}
