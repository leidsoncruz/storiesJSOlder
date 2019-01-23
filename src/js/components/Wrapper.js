import Story from './Story';

class Wrapper extends HTMLElement {
  constructor(options) {
    super();
    this.classList.add('post-stories');
    this.options = options;
    this.stories = options.stories;
    this._render();
  }

  _createStory(story, index) {
    const _story = new Story(story);
    _story.setAttribute('data-index', index);
    this.appendChild(_story);
  }

  _render() {
    this.stories.map(this._createStory.bind(this));
  }
}

export default Wrapper;
