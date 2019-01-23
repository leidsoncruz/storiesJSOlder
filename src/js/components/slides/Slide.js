class Slide extends HTMLElement{
  constructor(slide){
    super();
    this.slide = slide;
    this.classList.add('story__item');
    this._render();
    this._bindEvents();
  }

  _bindEvents(){
    this.addEventListener('touchstart', (event) => {event.preventDefault(); this._touchStartItem(this)});
    this.addEventListener('mousedown', (event) => {event.preventDefault(); this._touchStartItem(this)});
    this.addEventListener('touchend', (event) => {event.preventDefault(); this._touchEndtItem(this)});
    this.addEventListener('mouseup', (event) => {event.preventDefault(); this._touchEndtItem(this)});
  }

  _touchStartItem(element){
    console.log('start',element);
  }

  _touchEndtItem(element){
    console.log('end',element);
  }
}

export class SlideImage extends Slide {
  _render(){
    this.innerHTML = `<img src=${this.slide.src} /> <span>${this.slide.title}</span>`;
  }
}

export class SlideVideo extends Slide {
  _render(){
    this.innerHTML = `<video src="${this.slide.src}" preload="auto"></video>`;
  }
}
