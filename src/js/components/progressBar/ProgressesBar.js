export default class ProgressesBar extends HTMLElement {
  constructor(length){
    super();
    this.classList.add('progresses-bars');
    this.length = length;
    this.id = 0;
    this._render();
    this.wrapper = document.querySelector('stories-wrapper');
  }

  removeActiveBar(){
    this.activeBar.parentElement.removeAttribute('active');
  }

  toBeginning(){
    this.activeBar = this.querySelector('.progress-bar[active="true"] > .mybar');
    this.activeBar.style.width = '0%';
    this.removeActiveBar();
  }

  toEnd(){
    this.activeBar = this.querySelector('.progress-bar[active="true"] > .mybar');
    this.activeBar.style.width = '100%';
  }

  startProgress(index, width=0){
    this.activeBar = this.querySelector(`.progress-bar[data-index="${index}"] > .mybar`);
    this.activeBar.parentElement.setAttribute("active", true);
    this.storySlides = this.parentElement.querySelector('.story__slides');

    clearInterval(this.id);

    this.id = setInterval(_incrementWidth.bind(this), 15);
    this.wrapper.setIntervalId(this.id);

    function _incrementWidth(){
      if(width >= 100){
        clearInterval(this.id);
        this.storySlides.next();
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
