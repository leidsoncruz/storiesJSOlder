'use strict';

import screenfull from 'screenfull';
import '../scss/Stories.scss';

import EventEmitter from './EventEmitter';

import Wrapper from './components/wrapper/Wrapper';
import Story from './components/story/Story';
import Cover from './components/cover/Cover';
import Items from './components/items/Items';
import ButtonNext from './components/buttons/BtnNext';
import ButtonPrevious from './components/buttons/BtnPrev';
import ButtonClose from './components/buttons/BtnClose';
import ProgressesBar from './components/progressBar/ProgressesBar';
import Slides from './components/slides/Slides';
import ImageSlide from './components/slides/ImageSlide';
import VideoSlide from './components/slides/VideoSlide';


export const StoriesJS = (wrapper, options) => {
  const optionsDefault = {
    timer: 3
  };

  let currentIndexStory = 0, idInterval = 0;

  const getWrapperElement = () => {
    return document.querySelector(wrapper) ? wrapper : document.body;
  }

  const exit = () => {
    if(idInterval)clearInterval(idInterval);
    const modal = document.querySelector('.modal.modal-stories');
    if(modal) modal.remove();
  }

  const bindElementsWithFn = (arrElements, event, fn) => {
    for (let i = 0; i <= arrElements.length - 1; i += 1) {
      arrElements[i].addEventListener(event, function () {
        fn(this);
      });
    }
  };

  const hideElements = (arrElements) => {
    for (let i = 0; i <= arrElements.length - 1; i += 1) {
      arrElements[i].style.display = 'none';
    }
  };

  const parseElements = (elements) => {
    return elements.filter(item => item ? item : null);
  }

  const removeAttributesFromElements = (arrElements, attribute) => {
    for (let i = 0; i <= arrElements.length - 1; i += 1) {
      arrElements[i].removeAttribute(attribute);
    }
  };

  if (!(window.customElements && document.body.attachShadow)) {
    getWrapperElement().innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements v1.</b>";
    return;
  }

  customElements.define('slide-image', ImageSlide);
  customElements.define('slide-video', VideoSlide);
  customElements.define('story-slides', Slides);
  customElements.define('progresses-bar', ProgressesBar);
  customElements.define('btn-prev', ButtonPrevious);
  customElements.define('btn-next', ButtonNext);
  customElements.define('btn-close', ButtonClose);
  customElements.define('story-items', Items);
  customElements.define('story-cover', Cover);
  customElements.define('stories-story', Story);
  customElements.define('stories-wrapper', Wrapper);
  const _wrapper = new Wrapper(options);

  EventEmitter.defineTarget(_wrapper);

  getWrapperElement().appendChild(_wrapper);

  screenfull.on('change', () => {
    if (!screenfull.isFullscreen) exit();
  });

  // Elements

  // const openStory = (element, story) => {
  //   currentIndexStory = parseInt(element.getAttribute('data-index'));
  //   let modal = document.querySelector('.modal.modal-stories');
  //   modal.querySelector('.story__items').setAttribute('slides', JSON.stringify(story.slides));
  //   modal.querySelector('.story__items').setAttribute('time', 0);
  // }
  //

  //
  // customElements.define('story-item-image', class extends HTMLElement {
  //   //fazer alteração em um atributo do pai para executar o changecallback
  //   constructor(){
  //     super();
  //     this.addEventListener('touchstart', (event) => {event.preventDefault();this._touchStartItem(this)})
  //     this.addEventListener('mousedown', (event) => {event.preventDefault();this._touchStartItem(this)})
  //     this.addEventListener('touchend', (event) => {event.preventDefault();this._touchEndtItem(this)})
  //     this.addEventListener('mouseup', (event) => {event.preventDefault();this._touchEndtItem(this)})
  //   }
  //
  //   _touchStartItem(element){
  //     this.btnClose = this.parentElement.parentElement.querySelector('.btn-close');
  //     this.progressBar = this.parentElement.parentElement.querySelector('progresses-bar');
  //     this.spanTitle = this.querySelector('span');
  //
  //     this.btnClose.style= 'none';
  //     this.progressBar.style.display = 'none';
  //     this.spanTitle.style.display = 'none';
  //
  //     clearInterval(idInterval);
  //   }
  //
  //   _touchEndtItem(element) {
  //     this.btnClose.removeAttribute('style');
  //     this.progressBar.removeAttribute('style');
  //     this.spanTitle.removeAttribute('style');
  //
  //     const activeIndexSlide = this.parentElement.querySelector('.active').getAttribute('data-index');
  //     const currentProgressWidth = this.progressBar.querySelector(`.progress-bar[data-index="${activeIndexSlide}"] > .mybar`).style.width;
  //
  //     this.parentElement.parentElement.setAttribute('progress-width', parseInt(currentProgressWidth, 10))
  //   }
  //
  //   _render(slide){
  //     this.innerHTML = `<img src=${slide.src} /> <span>${slide.title}</span>`;
  //   }
  // });
  //
  // customElements.define('story-item-video', class extends HTMLElement {
  //   constructor(){
  //     super();
  //     this.addEventListener('touchstart', (event) => {event.preventDefault();this._touchStartItem(this)})
  //     this.addEventListener('mousedown', (event) => {event.preventDefault();this._touchStartItem(this)})
  //     this.addEventListener('touchend', (event) => {event.preventDefault();this._touchEndtItem(this)})
  //     this.addEventListener('mouseup', (event) => {event.preventDefault();this._touchEndtItem(this)})
  //   }
  //
  //   _touchStartItem(element){
  //     this.btnClose = this.parentElement.parentElement.querySelector('.btn-close');
  //     this.progressBar = this.parentElement.parentElement.querySelector('progresses-bar');
  //
  //     this.btnClose.style= 'none';
  //     this.progressBar.style.display = 'none';
  //     this.children[0].pause();
  //     clearInterval(idInterval);
  //   }
  //
  //   _touchEndtItem(element) {
  //     this.btnClose.removeAttribute('style');
  //     this.progressBar.removeAttribute('style');
  //
  //     const activeIndexSlide = this.parentElement.querySelector('.active').getAttribute('data-index');
  //     const currentProgressWidth = this.progressBar.querySelector(`.progress-bar[data-index="${activeIndexSlide}"] > .mybar`).style.width;
  //     this.parentElement.parentElement.setAttribute('progress-width', parseInt(currentProgressWidth, 10))
  //   }
  //
  //   _render(slide){
  //     this.innerHTML = `<video src="${slide.src}" preload="auto"></video>`;
  //   }
  // });
  //
  //
  // customElements.define('story-items', class extends HTMLElement {
  //   static get observedAttributes() {
  //     return ['slides', 'progress-width'];
  //   }
  //
  //   attributeChangedCallback(name, oldValue, newValue) {
  //     if(oldValue && name === 'slides'){
  //       this.slides = JSON.parse(this.getAttribute('slides'));
  //       this.innerHTML = this._render();
  //       this.list = this.querySelector('.story__slides');
  //       this._renderItems();
  //       this._init();
  //     }
  //
  //     if(newValue && name === 'progress-width'){
  //       const width = parseInt(this.getAttribute('progress-width'), 10)
  //       this._startProgress(width);
  //     }
  //   }
  //
  //   constructor() {
  //     super();
  //     this.classList.add('story__items');
  //     this.slides = JSON.parse(this.getAttribute('slides'));
  //     this.innerHTML = this._render();
  //   }
  //
  //   connectedCallback(){
  //     this.list = this.querySelector('.story__slides');
  //     this._renderItems();
  //     this._init();
  //   }
  //
  //   disconnectedCallback(){
  //     this.parentElement.querySelector('.btn-prev').removeEventListener('click', () => this._prevSlide());
  //     this.parentElement.querySelector('.btn-next').removeEventListener('click', () => this._nextSlide());
  //     this.parentElement.querySelector('.btn-close').removeEventListener('click', exit);
  //   }
  //
  //   _bindEvents(){
  //     this.parentElement.querySelector('.btn-close').addEventListener('click', exit);
  //     this.parentElement.querySelector('.btn-prev').addEventListener('click', () => this._prevSlide());
  //     this.parentElement.querySelector('.btn-next').addEventListener('click', () => this._nextSlide());
  //   }
  //
  //   _init(){
  //     this.activeSlide = this.querySelector('.story__item.active') || this.querySelector('.story__item');
  //     this.activeSlide.classList.add('active');
  //     this.currentDataIndex = this.activeSlide.getAttribute('data-index');
  //     this.activeProgress = this.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);
  //
  //     this._bindEvents();
  //     this._startProgress();
  //   }
  //
  //   _renderItems(){
  //     this.slides.forEach((slide, idx) => {
  //       if (slide.type == "video") {
  //         this._renderVideo(slide, idx);
  //       } else {
  //         this._renderImage(slide, idx);
  //       }
  //     });
  //   }
  //
  //   _render(){
  //     return `
  //     <div class="btn-prev"></div>
  //     <div class="btn-next"></div>
  //     <progresses-bar length=${this.slides.length}></progresses-bar>
  //     <div class="btn-close"> <span>X</span> </div>
  //     <div class="story__slides">
  //     </div>
  //     `;
  //   }
  //
  //   _renderImage(slide, index){
  //     const storyImageEl = document.createElement('story-item-image');
  //     storyImageEl.classList.add('story__item')
  //     storyImageEl.setAttribute('data-index', index+1);
  //     storyImageEl.setAttribute('src', slide.src);
  //     storyImageEl.setAttribute('title', slide.title);
  //     this.list.appendChild(storyImageEl);
  //     storyImageEl._render(slide)
  //   }
  //
  //   _renderVideo(slide, index){
  //     const storyVideoEl = document.createElement('story-item-video');
  //     storyVideoEl.classList.add('story__item')
  //     storyVideoEl.setAttribute('data-index', index+1);
  //     storyVideoEl.setAttribute('src', slide.src);
  //     this.list.appendChild(storyVideoEl);
  //     storyVideoEl._render(slide)
  //   }
  //
  //   _startProgress(width=0){
  //     const me = this;
  //     const contentElement = this.activeSlide.children[0];
  //
  //     if(idInterval > 0)clearInterval(idInterval);
  //
  //
  //     this.isVideo = contentElement.tagName==="VIDEO";
  //
  //     if(this.isVideo){
  //       if(contentElement.readyState >= 2) {
  //         me._playSlide(width, contentElement.duration);
  //         if(width==0) contentElement.currentTime=0;
  //         contentElement.play();
  //       }
  //
  //       contentElement.addEventListener('loadeddata', function() {
  //         if(contentElement.readyState >= 2) {
  //           me._playSlide(0, contentElement.duration);
  //           contentElement.play();
  //         }
  //       });
  //     }else{
  //       this._playSlide(width);
  //     }
  //
  //   }
  //
  //   _playSlide(width=0, timer=optionsDefault.timer){
  //     const me = this;
  //     const timeSlide = Math.floor(timer)*10;
  //
  //     idInterval = setInterval(frame, timeSlide);
  //
  //     function frame() {
  //       if (width >= 100) {
  //         clearInterval(idInterval);
  //         // me._nextSlide();
  //       } else {
  //         width += 1;
  //         me.activeProgress.style.width = `${width}%`;
  //       }
  //     }
  //   }
  //
  //   _prevSlide(){
  //     const prevSlide = this.activeSlide.previousElementSibling;
  //     const prevStory = document.querySelector(`.story[data-index="${currentIndexStory-1}"]`);
  //
  //     if(this.isVideo){
  //       this.activeSlide.children[0].pause();
  //     }
  //
  //     if (prevSlide) {
  //       this.activeProgress.style.width = '0%';
  //       this.activeSlide.classList.remove('active');
  //       prevSlide.classList.add('active');
  //       this.activeSlide = prevSlide;
  //       this.currentDataIndex = prevSlide.getAttribute('data-index');
  //       this.activeProgress = this.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);
  //       this._startProgress(0);
  //     }else if (prevStory && prevStory.classList.contains('story')) {
  //       openStory(prevStory, options.stories[currentIndexStory-1]);
  //     }else {
  //       exit();
  //     }
  //   }
  //
  //   _nextSlide() {
  //     const nextSlide = this.activeSlide.nextElementSibling;
  //     const nextStory = document.querySelector(`.story[data-index="${currentIndexStory+1}"]`);
  //
  //     if(this.isVideo){
  //       this.activeSlide.children[0].pause();
  //     }
  //
  //     if(nextSlide){
  //       this.activeProgress.style.width = '100%';
  //       this.activeSlide.classList.remove('active');
  //       nextSlide.classList.add('active');
  //       this.activeSlide = nextSlide;
  //       this.currentDataIndex = nextSlide.getAttribute('data-index');
  //       this.activeProgress = this.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);
  //       this._startProgress();
  //     }else if (nextStory && nextStory.classList.contains('story')) {
  //       openStory(nextStory, options.stories[currentIndexStory+1]);
  //     }else{
  //       exit();
  //     }
  //   }
  //
  // });

};


var opt = { stories: [{ title: 'poe', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg', slides: [{ type: 'image', title: 't1', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg' }, { type: 'image', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg' }], }, { title: 'po2', preview: '', slides: [{ type: 'video', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4' }, { title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg' }] }], };

StoriesJS(null, opt);
