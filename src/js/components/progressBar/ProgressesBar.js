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

  toBeginning() {
    this.activeBar = this.querySelector('.progress-bar[active="true"] > .mybar');
    this.activeBar.style.width = '0%';
    this.removeActiveBar();
  }

  toEnd() {
    this.activeBar = this.querySelector('.progress-bar[active="true"] > .mybar');
    this.activeBar.style.width = '100%';
  }

  setDuration(timer) {
    this.timer = timer;
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
        width += 1;
        this.activeBar.style.width = `${width}%`;
      }
    }
  }

  _bindCustomEvents() {
    EventEmitter.on('stopProgress', this._onStopProgress.bind(this));
  }

  _render() {
    const _str = Array(this.length + 1).join(1).split('').map((x, i) => i) .map(index => `<div class="progress-bar" data-index="${index + 1}"> <div class="mybar"></div></div>`).join('');
    this.innerHTML = _str;
  }
}
