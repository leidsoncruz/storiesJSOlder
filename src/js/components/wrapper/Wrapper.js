import  { EVENTS } from '../../Utils';
import EventEmitter from '../../EventEmitter';
import Story from '../story/Story';

class Wrapper extends HTMLElement {
  constructor(options) {
    super();
    this.classList.add('post-stories');
    this.options = options;
    this.stories = options.stories;
    this.instances = [];

    EventEmitter.define(this);

    this._onNextStory = this._onNextStory.bind(this);
    this._onPreviousStory = this._onPreviousStory.bind(this);

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

    EventEmitter.dispatch(EVENTS.stopProgress);
    this._updateStory(story);

    if (target) {
      EventEmitter.dispatch(EVENTS.open, this.instances[target.dataset.index]);
    } else {
      EventEmitter.dispatch(EVENTS.exit);
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

  _unbindCustomEvents() {
    EventEmitter.off(EVENTS.nextStory, this._onNextStory);
    EventEmitter.off(EVENTS.previousStory, this._onPreviousStory);
  }

  _bindCustomEvents() {
    this._unbindCustomEvents();
    EventEmitter.on(EVENTS.nextStory, this._onNextStory);
    EventEmitter.on(EVENTS.previousStory, this._onPreviousStory);
  }

  _render() {
    this.instances = this.stories.map(this._createStory.bind(this));
  }
}

export default Wrapper;
