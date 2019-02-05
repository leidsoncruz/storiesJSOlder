import EventEmitter from '../../EventEmitter';

export default class ProgressesBar extends HTMLElement {
  constructor(length) {
    super();
    this.classList.add('progresses-bars');
    this.length = length;
    this.id = 0;
    this._render();
    this._bindCustomEvents();
  }

  removeActiveBar() {
    this.activeBar.parentElement.removeAttribute('active');
  }

  setDuration(timer) {
    this.timer = timer;
  }

  _setProgressWidth(width) {
    if (this.activeBar) {
      this.activeBar.style.width = `${width}%`;
    }
  }

  _onToBeginning() {
    this._setProgressWidth(0);
    this.removeActiveBar();
  }

  _onToEnd() {
    this._setProgressWidth(100);
  }

  _onStopProgress() {
    if (this.id) {
      window.clearInterval(this.id);
    }
  }

  startProgress(index, width = 0) {
    this.activeBar = this.querySelector(`.progress-bar[data-index="${index}"] > .mybar`);
    this.activeBar.parentElement.setAttribute('active', true);

    EventEmitter.dispatch('stopProgress');

    this.id = setInterval(_incrementWidth.bind(this), Math.floor(this.timer) * 10);

    function _incrementWidth() {
      if (width >= 100) {
        EventEmitter.dispatch('stopProgress');
        EventEmitter.dispatch('nextSlide');
      } else {
        width+=1;
        this._setProgressWidth(width);
      }
    }
  }

  _bindCustomEvents() {
    EventEmitter.on('stopProgress', this._onStopProgress.bind(this));
    EventEmitter.on('toEnd', this._onToEnd.bind(this));
    EventEmitter.on('toBeginning', this._onToBeginning.bind(this));
  }

  _render() {
    const _str = Array(this.length + 1).join(1).split('').map((x, i) => i) .map(index => `<div class="progress-bar" data-index="${index + 1}"> <div class="mybar"></div></div>`).join('');
    this.innerHTML = _str;
  }
}
