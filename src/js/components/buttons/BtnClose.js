import  { EVENTS } from '../../Utils';
import EventEmitter from '../../EventEmitter';

export default class ButtonClose extends HTMLElement {
  constructor() {
    super();
    this.classList.add('btn-close');
    this._bindEvents();
    this._render();
  }

  _bindEvents() {
    this.addEventListener('click', () => {
      EventEmitter.dispatch(EVENTS.exit);
    });
  }

  _render() {
    this.innerHTML = '<span>X</span>';
  }
}
