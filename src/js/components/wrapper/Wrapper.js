import Story from '../story/Story';

import EventEmitter from '../../EventEmitter';

class Wrapper extends HTMLElement {
  constructor(options) {
    super();
    this.classList.add('post-stories');
    this.options = options;
    this.stories = options.stories;
    this.instances = [];

    EventEmitter.define(this);

    this._render();
    this._bindCustomEvents();
  }

  setIntervalId(id) {
    this.idInterval = id;
  }

  _updateStory(story) {
    story.removeAttribute('active');
  }

  _changeStory(axis) {
    const story = this.querySelector('stories-story[active="true"]');
    const target = story[`${axis}ElementSibling`];

    EventEmitter.dispatch('stopProgress');
    this._updateStory(story);

    if(target){
      EventEmitter.dispatch('openStory', this.instances[target.dataset.index]);
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
    return _story;
  }

  _bindCustomEvents() {
    EventEmitter.clear('nextStory', 'previousStory');
    EventEmitter.on('nextStory', this._onNextStory.bind(this));
    EventEmitter.on('previousStory', this._onPreviousStory.bind(this));
  }

  _render() {
    this.instances = this.stories.map(this._createStory.bind(this));
  }
}

export default Wrapper;
