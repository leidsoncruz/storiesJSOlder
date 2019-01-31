import Story from '../story/Story';

import EventEmitter from '../../EventEmitter';

class Wrapper extends HTMLElement {
  constructor(options) {
    super();
    this.classList.add('post-stories');
    this.options = options;
    this.stories = options.stories;

    EventEmitter.define(this);

    this._render();
  }

  setIntervalId(id) {
    this.idInterval = id;
  }

  gettIntervalId(){
    return this.idInterval;
  }

  prev() {
    clearInterval(this.idInterval);
    const activeStory = this.querySelector('stories-story[active="true"]');
    const prevStory = activeStory.previousElementSibling;
    if(prevStory){
      EventEmitter.dispatch('previousStory');
      activeStory.removeAttribute("active");
      prevStory.openStory();
    }else {
      exit();
    }
  }

  next(){
    clearInterval(this.idInterval);
    const activeStory = this.querySelector('stories-story[active="true"]');
    const nextStory = activeStory.nextElementSibling;
    if(nextStory){
      EventEmitter.dispatch('nextStory');
      activeStory.removeAttribute("active");
      nextStory.openStory();
    }else {
      exit();
    }
  }

  _createStory(story, index) {
    const _story = new Story(story);
    _story.setAttribute('data-index', index);
    this.appendChild(_story);
    _story.render();
  }

  _render() {
    this.stories.map(this._createStory.bind(this));
  }
}

export default Wrapper;
