import  { EVENTS } from '../../Utils';
import EventEmitter from '../../EventEmitter';

export default class ButtonNext extends HTMLElement {
  constructor() {
    super();
    this.classList.add('btn-next');
    this.addEventListener('click', this._onPressNext.bind(this));
  }

  _onPressNext() {
    EventEmitter.dispatch(EVENTS.toEnd);
    EventEmitter.dispatch(EVENTS.nextSlide);
  }
}
