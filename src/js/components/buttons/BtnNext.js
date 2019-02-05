import EventEmitter from '../../EventEmitter';

export default class ButtonNext extends HTMLElement {
  constructor() {
    super();
    this.classList.add('btn-next');
    this.addEventListener('click', this._onPressNext.bind(this));
  }

  _onPressNext() {
    EventEmitter.dispatch('toEnd');
    EventEmitter.dispatch('nextSlide');
  }
}
