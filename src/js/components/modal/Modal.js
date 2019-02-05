import ButtonNext from '../buttons/BtnNext';
import ButtonPrevious from '../buttons/BtnPrev';
import ButtonClose from '../buttons/BtnClose';
import ProgressesBar from '../progressBar/ProgressesBar';
import Slides from '../slides/Slides';

export default class Modal extends HTMLElement {
  constructor(story) {
    super();
    this.slides = story.slides;
    this.classList.add('story__items');
    this._render();
  }

  _render() {
    const btnPrev = new ButtonPrevious();
    const btnNext = new ButtonNext();
    const btnClose = new ButtonClose();
    const progressBar = new ProgressesBar(this.slides.length);

    this.appendChild(btnPrev);
    this.appendChild(btnNext);
    this.appendChild(btnClose);
    this.appendChild(progressBar);

    const slides = new Slides(this.slides);
    this.appendChild(slides);
    slides.init();
  }

}
