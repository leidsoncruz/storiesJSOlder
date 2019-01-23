import ButtonNext from './BtnNext';
import ButtonPrevious from './BtnPrev';
import ButtonClose from './BtnClose';
import ProgressesBar from './ProgressesBar';
import Slides from './Slides';

export default class Items extends HTMLElement {
  constructor(story){
    super();
    this.slides = story.slides;
    this.classList.add('story__items');
    this._render();
    this._init();
  }

  _init(){
    this.activeSlide = this.querySelector('.story__item.active') || this.querySelector('.story__item');
    this.activeSlide.classList.add('active');
  }

  _render(){
    const btnPrev = new ButtonPrevious();
    const btnNext = new ButtonNext();
    const btnClose = new ButtonClose();
    const progressesBar = new ProgressesBar(this.slides.length);
    const slides = new Slides(this.slides);

    this.appendChild(btnPrev);
    this.appendChild(btnNext);
    this.appendChild(btnClose);
    this.appendChild(progressesBar);
    this.appendChild(slides);
  }

}
