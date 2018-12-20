'use strict';

import screenfull from 'screenfull';
import '../scss/Stories.scss';

export const StoriesJS = (wrapper, options) => {
  const getWrapperElement = () => {
    return document.querySelector(wrapper) ? wrapper : document.body;
  }

  const exit = () => {
    const modal = document.querySelector('.modal.modal-stories');
    modal.remove();
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

  customElements.define('stories-story', class extends HTMLElement {
    constructor() {
      super();
      this.classList.add('story');
      this.index = this.getAttribute('data-index');
      this.story = options.stories[this.index];
      this.innerHTML = this.render();
    }

    _openStory() {
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
    constructor() {
      super();
      this.classList.add('story__items');
      this.innerHTML = this.render();
    }

    render(){
      const slides = JSON.parse(this.getAttribute('slides'));

      return `
      <div class="btn-prev"></div>
      <div class="btn-next"></div>
      <progresses-bar length=${slides.length}></progresses-bar>
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

    _playSlide(width=0, timer=1){
      const me = this;
      const timeSlide = Math.floor(timer)*10;


      var id = setInterval(frame, timeSlide);

      function frame() {
        if (width >= 100) {
          clearInterval(id);
          me._nextSlide();
        } else {
          width += 1;
          me.activeProgress.style.width = `${width}%`;
        }
      }
    }

    _nextSlide() {
      const nextSlide = this.activeItem.nextElementSibling;
      if(this.isVideo){
        this.activeItem.children[0].stop;
      }
    }

    startProgress(){
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

    connectedCallback(){
      this.activeItem = this.querySelector('.story__item.active') || this.querySelector('.story__item');
      this.activeItem.classList.add('active');
      this.currentDataIndex = this.activeItem.getAttribute('data-index');
      this.activeProgress = this.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);

      this.startProgress();
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
