export default class ProgressesBar extends HTMLElement {
  constructor(length){
    super();
    this.classList.add('progresses-bars');
    this.length = length;
    this._render();
  }

  _render(){
    const _str = Array(this.length + 1).join(1).split('').map((x, i) => i) .map(index => `<div class="progress-bar" data-index="${index + 1}"> <div class="mybar"></div></div>`).join('');
    this.innerHTML = _str;
  }
}
