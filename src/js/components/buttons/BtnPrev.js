export default class ButtonPrevious extends HTMLElement {
  constructor(){
    super();
    this.classList.add('btn-prev');
    this.addEventListener('click', this._onPressPrev.bind(this));
  }

  _onPressPrev(){
    const storySlides = this.parentElement.querySelector('story-slides');
    const progressesBar = this.parentElement.querySelector('progresses-bar');

    progressesBar.toBeginning();
    storySlides.prev();

  }
}
