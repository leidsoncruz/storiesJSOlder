import screenfull from 'screenfull';

import Cover from './Cover';
import Items from './Items';
import { createModal } from '../Utils';

export default class Story extends HTMLElement {
  constructor(story){
    super();
    this.story = story;
    this.classList.add('story');
    this.index = this.getAttribute('data-index');
    this.addEventListener('click', this._openStory.bind(this))
    this._render();
  }

  _openStory(event){
    const modal = createModal();
    document.body.appendChild(modal);
    const items = new Items(this.story);
    modal.appendChild(items);
    // screenfull.request(modal);
  }

  _render(){
    const preview = this.story.preview || this.story.slides[0].preview || this.story.slides[0].src;
    const title = this.story.title;
    const cover = new Cover(preview, title);
    this.appendChild(cover);
    cover._render();
  }
}
