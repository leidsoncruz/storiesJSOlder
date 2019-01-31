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
    this._bindCustomEvents();
  }

  setIntervalId(id) {
    this.idInterval = id;
  }

  gettIntervalId(){
    return this.idInterval;
  }

  _updateStory(story) {
    story.removeAttribute('data-active');
  }

  _changeStory(axis) {
    const story = this.querySelector('stories-story[data-active="true"]');

    clearInterval(this.idInterval);

    if(story[`${axis}ElementSibling`]){
      this._updateStory(story);

      EventEmitter.dispatch('openStory');
    } else {
      EventEmitter.dispatch('exitStory');
    }
  }

  _onNextStory() {
    this._changeStory('next');
  }

  _onPreviousStory() {
    this._changeStory('previous');
  }

  _createStory(story, index) {
    const _story = new Story(story);
    _story.setAttribute('data-index', index);
    this.appendChild(_story);
    _story.render();
  }

  _bindCustomEvents() {
    EventEmitter.clear('nextStory', 'previousStory');
    EventEmitter.on('nextStory', this._onNextStory.bind(this));
    EventEmitter.on('previousStory', this._onPreviousStory.bind(this));
  }

  _render() {
    this.stories.map(this._createStory.bind(this));
  }
}

export default Wrapper;
