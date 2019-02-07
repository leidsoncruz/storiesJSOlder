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


var opt = {stories: [{ title: 'poe', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg', slides: [{ type: 'image', title: 't1', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg' }, { type: 'image', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg' }], }, { title: 'po2', preview: '', slides: [{ type: 'video', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4' }, { title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg' }] }], };

// var opt = { classes: {VideoSlide: Teste}, stories: [{ title: 'poe', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg', slides: [{ type: 'image', title: 't1', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/8.jpg' }, { type: 'image', title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/9.jpg' }], }, { title: 'po2', preview: '', slides: [{ type: 'video', preview: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg', title: 't2', src: 1608952 }, { title: 't2', src: 'https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg' }] }], };


StoriesJS(null, opt);
