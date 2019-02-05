import EventEmitter from '../../EventEmitter';

export default class ButtonPrevious extends HTMLElement {
  constructor() {
    super();
    this.classList.add('btn-prev');
    this.addEventListener('click', this._onPressPrev.bind(this));
  }

  _onPressPrev() {
    const progressesBar = this.parentElement.querySelector('progresses-bar');

    progressesBar.toBeginning();

    EventEmitter.dispatch('previousSlide');
  }
}
