// import screenfull from 'screenfull';
import '../scss/Stories.scss';

import ButtonClose from './components/buttons/BtnClose';
import ButtonNext from './components/buttons/BtnNext';
import ButtonPrevious from './components/buttons/BtnPrev';
import Cover from './components/cover/Cover';
import ImageSlide from './components/slides/ImageSlide';
import Modal from './components/modal/Modal';
import ProgressesBar from './components/progressBar/ProgressesBar';
import Slides from './components/slides/Slides';
import Story from './components/story/Story';
import VideoSlide from './components/slides/VideoSlide';
import Wrapper from './components/wrapper/Wrapper';


export const StoriesJS = (wrapper, options) => {
  const getClasses = (name, _default) => {
    try {
      return options.classes[name];
    } catch (e) {
      return _default;
    }
  };

  const getWrapperElement = () => {
    return document.querySelector(wrapper) ? wrapper : document.body;
  };

  if (!(window.customElements && document.body.attachShadow)) {
    getWrapperElement().innerHTML = '<b>Your browser doesn\'t support Shadow DOM and Custom Elements v1.</b>';
    return;
  }

  customElements.define('slide-image', ImageSlide);
  customElements.define('slide-video', getClasses('VideoSlide', VideoSlide));
  customElements.define('story-slides', Slides);
  customElements.define('progresses-bar', ProgressesBar);
  customElements.define('btn-prev', ButtonPrevious);
  customElements.define('btn-next', ButtonNext);
  customElements.define('btn-close', ButtonClose);
  customElements.define('story-modal', Modal);
  customElements.define('story-cover', Cover);
  customElements.define('stories-story', Story);
  customElements.define('stories-wrapper', Wrapper);
  const _wrapper = new Wrapper(options);

  getWrapperElement().appendChild(_wrapper);
};

/* eslint-disable */
const callbacks = {
  CALLBACK_CLICK_STORY: function onClickStory(event) {
    // const result = Object.assign({}, this, event.detail);
    console.log('CALLBACK_CLICK_STORY', event.detail);
  },
  CALLBACK_CLOSE_STORY: function onClickStory(event) {
    // const result = Object.assign({}, this, event.detail);
    console.log('CALLBACK_CLOSE_STORY', event.detail);
  },
  CALLBACK_SLIDE_END: function onSlideEnd(event) {
    // const result = Object.assign({}, this, event.detail);
    console.log('CALLBACK_SLIDE_END', event.detail);
  }
};

import SlideBase from './components/slides/SlideBase';

class VideoSlideGlobo extends SlideBase {
  constructor(slide){
    super(slide);
    this.timer = null;
    this.player = new WM.Player({
      autoPlay: true,
      chromeless: true,
      exitFullscreenOnEnd: false,
      onPlay: this._playVideo.bind(this)
    });
  }

  _playVideo(){
    if(this.player.getCurrentTime() === 0 || this.timer === 0){
      this._start(this.timer || this.player.getDuration());
    }
  }

  _touchStartItem(element){
    super._touchStartItem(element);
    this.player.pause();
  }

  _touchEndtItem(element){
    super._touchEndtItem(element);
    this.timer = null;
    this.player.play();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === "active" && newValue === "true"){
      this.timer = 0;
      this.player.play();
    }else if (name === "active" && newValue !== "true") {
      this.player.stop();
      this.timer = null;
    }
  }

  _render(){
    this.player.load(this.slide.src);
    this.player.attachTo(this);
  }
}



// var opt = {callbacks: callbacks, stories: [{ title: 'poe', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg', slides: [{ type: 'image', title: 't1', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg' }, { type: 'image', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg' }], }, { title: 'po2', preview: '', slides: [{ type: 'video', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4' }, { title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg' }] }], };

var opt = { callbacks: callbacks, classes: {VideoSlide: VideoSlideGlobo}, stories: [{ title: 'poe', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg', slides: [{ type: 'image', title: 't1', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg' }, { type: 'image', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg' }], }, { title: 'po2', preview: '', slides: [{ type: 'video', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg', title: 't2', src: 1608952 }, { title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg' }] }], };


StoriesJS(null, opt);
/* eslint-enable */
