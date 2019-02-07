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

  _setVideoClass() {
    const { classes } = this.options;
    if (classes && classes.VideoSlide) {
      EventEmitter.dispatch(EVENTS.setVideoClass, this.options.classes.VideoSlide);
    }
  }

  _bindCustomEvents() {
    EventEmitter.clear(EVENTS.nextStory, EVENTS.previousStory);
    EventEmitter.on(EVENTS.nextStory, this._onNextStory.bind(this));
    EventEmitter.on(EVENTS.previousStory, this._onPreviousStory.bind(this));
    EventEmitter.on(EVENTS.slidesAvailable, this._setVideoClass.bind(this));
  }

  _render() {
    this.instances = this.stories.map(this._createStory.bind(this));
  }
}

export default Wrapper;
