export default class ProgressesBar extends HTMLElement {
  constructor(length){
    super();
    this.classList.add('progresses-bars');
    this.length = length;
    this._render();
  }

  startProgress(index, width=0){
    this.activeBar = this.querySelector(`.progress-bar[data-index="${index}"] > .mybar`);
    this.storySlides = this.parentElement.querySelector('.story__slides');
    const id = setInterval(_incrementWidth.bind(this), 15);

    function _incrementWidth(){
      if(width >= 100){
        this.storySlides.next();
        clearInterval(id);
      }else{
        width+=1;
        this.activeBar.style.width = `${width}%`;
      }
    }
  }

  _render(){
    const _str = Array(this.length + 1).join(1).split('').map((x, i) => i) .map(index => `<div class="progress-bar" data-index="${index + 1}"> <div class="mybar"></div></div>`).join('');
    this.innerHTML = _str;
  }
}
