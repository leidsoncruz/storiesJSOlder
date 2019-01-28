export default class ButtonNext extends HTMLElement {
  constructor(){
    super();
    this.classList.add('btn-next');
    this.addEventListener('click', this._onPressNext.bind(this));
  }

  _onPressNext(){
    const storySlides = this.parentElement.querySelector('story-slides');
    const progressesBar = this.parentElement.querySelector('progresses-bar');
    progressesBar.toEnd();
    storySlides.next();
  }
}
