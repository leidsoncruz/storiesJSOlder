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

  _onRemoveProgress() {
    this.activeBar.parentElement.removeAttribute('active');
  }

  _onSetDuration({ detail }) {
    this.timer = detail;
  }

  _setProgressWidth(width) {
    if (this.activeBar) {
      this.activeBar.style.width = `${width}%`;
    }
  }

  _onToBeginning() {
    this._setProgressWidth(0);
    EventEmitter.dispatch('removeProgress');
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
        width += 1;
        this._setProgressWidth(width);
      }
    }
  }

  _bindCustomEvents() {
    EventEmitter.on('stopProgress', this._onStopProgress.bind(this));
    EventEmitter.on('toEnd', this._onToEnd.bind(this));
    EventEmitter.on('toBeginning', this._onToBeginning.bind(this));
    EventEmitter.on('setDuration', this._onSetDuration.bind(this));
    EventEmitter.on('removeProgress', this._onRemoveProgress.bind(this));
  }

  _renderBar(value) {
    return `<div class="progress-bar" data-index="${value}"><div class="mybar"></div></div>`;
  }

  _render() {
    let renderBarList = [];

    for (let i = 0; i < this.length; i++) {
      renderBarList.push(this._renderBar(i + 1));
    }

    renderBarList.join('');

    this.innerHTML = renderBarList;
  }
}
