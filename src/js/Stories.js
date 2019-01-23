'use strict';

import screenfull from 'screenfull';
import '../scss/Stories.scss';

export const StoriesJS = (wrapper, options) => {
  const optionsDefault = {
    timer: 3
  };

  let currentIndexStory = 0;

  const getWrapperElement = () => {
    return document.querySelector(wrapper) ? wrapper : document.body;
  }

  const exit = () => {
    const modal = document.querySelector('.modal.modal-stories');
    if(modal) modal.remove();
  }

  if (!(window.customElements && document.body.attachShadow)) {
    getWrapperElement().innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements v1.</b>";
    return;
  }

  getWrapperElement().innerHTML = "<stories-wrapper></stories-wrapper>";

  screenfull.on('change', () => {
    if (!screenfull.isFullscreen) exit();
  });

  // Elements
  customElements.define('stories-wrapper', class extends HTMLElement {
    constructor() {
      super();
      this.classList.add('post-stories');
      this.innerHTML = this.render().join('');
    }

    render() {
      return options.stories.map((story, idx) => `<stories-story data-index=${idx}></stories-story>`)
    }
  });

  const openStory = (element, story) => {
    currentIndexStory = parseInt(element.getAttribute('data-index'));
    let modal = document.querySelector('.modal.modal-stories');
    modal.querySelector('.story__items').setAttribute('slides', JSON.stringify(story.slides));
  }

  customElements.define('stories-story', class extends HTMLElement {
    constructor() {
      super();
      this.classList.add('story');
      this.index = this.getAttribute('data-index');
      this.story = options.stories[this.index];
      this.innerHTML = this.render();
    }

    _openStory() {
      currentIndexStory = parseInt(this.getAttribute('data-index'));
      let modal = document.createElement('div');
      modal.classList.add('modal', 'modal-stories');
      modal.innerHTML = `
      <story-items slides=${JSON.stringify(this.story.slides)}></story-items>
      `;
      document.body.appendChild(modal);
      screenfull.request(modal);
    }

    connectedCallback() {
      this._boundOpenStory = this._openStory.bind(this);
      this.addEventListener('click', this._boundOpenStory);
    }

    disconnectedCallback(){
      this.removeEventListener('click', this._boundOpenStory);
    }

    render(){
      const preview = this.story.preview || this.story.slides[0].preview || this.story.slides[0].src;
      const title = this.story.title;
      return `
      <story-cover preview=${preview} title=${title}></story-cover>
      `;
    }

  });

  customElements.define('story-cover', class extends HTMLElement {
    constructor() {
      super();
      this.classList.add('story__cover');
      this.innerHTML = this.render();
    }

    render(){
      const preview = this.getAttribute('preview');
      const title = this.getAttribute('title');
      return `
      <img src=${preview} alt=${title} />
      `;
    }

  });

  customElements.define('story-items', class extends HTMLElement {
    static get observedAttributes() {
      return ['slides'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if(oldValue){
        this.innerHTML = this._render();
        this._init();
      }
    }

    constructor() {
      super();
      this.classList.add('story__items');
      this.innerHTML = this._render();
    }

    _init(){
      this.activeSlide = this.querySelector('.story__item.active') || this.querySelector('.story__item');
      this.activeSlide.classList.add('active');
      this.currentDataIndex = this.activeSlide.getAttribute('data-index');
      this.activeProgress = this.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);
      this.parentElement.querySelector('.btn-close').addEventListener('click', exit);

      this._startProgress();

    }

    connectedCallback(){
      this._init();

    }

    disconnectedCallback(){
      this.parentElement.querySelector('.btn-close').removeEventListener('click', exit);
    }

    _render(){
      const slides = JSON.parse(this.getAttribute('slides'));

      return `
      <div class="btn-prev"></div>
      <div class="btn-next"></div>
      <progresses-bar length=${slides.length}></progresses-bar>
      <div class="btn-close"> <span>×</span> </div>
      <ul class="story__slides">
        ${slides.map((slide, idx) => slide.type == "video" ? this._renderVideo(slide, idx) : this._renderImage(slide, idx)).join('')}
      </ul>
      `;
    }

    _renderImage(slide, index){
      return `<li class="story__item" data-index="${index + 1}"> <img src=${slide.src} /> <span>${slide.title}</span> </li>`
    }

    _renderVideo(slide, index){
      return `<li class="story__item" data-index="${index + 1}"><video src="${slide.src}" preload="auto"></video></li>`;
    }

    _startProgress(){
      const me = this;
      const contentElement = this.querySelector('.active').children[0];

      this.isVideo = contentElement.tagName==="VIDEO";

      if(this.isVideo){
        contentElement.addEventListener('loadeddata', function() {
          if(contentElement.readyState >= 2) {
            me._playSlide(0, contentElement.duration);
            contentElement.play();
          }
        });
      }else{
        this._playSlide();
      }

    }

    _playSlide(width=0, timer=optionsDefault.timer){
      const me = this;
      const timeSlide = Math.floor(timer)*10;

      this.idInterval = setInterval(frame, timeSlide);

      function frame() {

        if (width >= 100) {
          clearInterval(me.idInterval);
          me._nextSlide();
        } else {
          width += 1;
          me.activeProgress.style.width = `${width}%`;
        }
      }
    }

    _nextSlide() {
      const nextSlide = this.activeSlide.nextElementSibling;
      const nextStory = document.querySelector(`.story[data-index="${currentIndexStory+1}"]`);

      if(this.isVideo){
        this.activeSlide.children[0].stop;
      }

      if(nextSlide && nextSlide.tagName === "LI"){
        this.activeProgress.style.width = '100%';
        this.activeSlide.classList.remove('active');
        nextSlide.classList.add('active');
        this.activeSlide = nextSlide;
        this.currentDataIndex = nextSlide.getAttribute('data-index');
        this.activeProgress = this.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);
        this._startProgress();
      }else if (nextStory && nextStory.classList.contains('story')) {
        openStory(nextStory, options.stories[currentIndexStory+1]);
      }else{
        exit();
      }

    }

  });

  customElements.define('progresses-bar', class extends HTMLElement {
    constructor() {
      super();
      this.classList.add('progresses-bars');
      this.innerHTML = this.render();
    }

    render(){
      const total = this.getAttribute('length');
      return Array(total + 1).join(1).split('').map((x, i) => i) .map(index => `<div class="progress-bar" data-index="${index + 1}"> <div class="mybar"></div></div>`).join('');
    }

  });

};


var opt = { stories: [{ title: 'poe', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg', slides: [{ type: 'image', title: 't1', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg' }, { type: 'image', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg' }], }, { title: 'po2', preview: '', slides: [{ type: 'video', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4' }, { title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg' }] }], };

StoriesJS(null, opt);
