import  { EVENTS } from '../../Utils';
import EventEmitter from '../../EventEmitter';

export default class ButtonPrevious extends HTMLElement {
  constructor() {
    super();
    this.classList.add('btn-prev');
    this.addEventListener('click', this._onPressPrev.bind(this));
  }

  _onPressPrev() {
    EventEmitter.dispatch(EVENTS.toBeginning);
    EventEmitter.dispatch(EVENTS.previousSlide);
  }
}
