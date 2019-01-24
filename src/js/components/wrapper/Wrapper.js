import Story from '../story/Story';

import { exit } from '../../Utils';

class Wrapper extends HTMLElement {
  constructor(options) {
    super();
    this.classList.add('post-stories');
    this.options = options;
    this.stories = options.stories;
    this._render();
  }

  next(){
    const activeStory = this.querySelector('stories-story[active="true"]');
    const nextStory = activeStory.nextElementSibling;
    if(nextStory){
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
