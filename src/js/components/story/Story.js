import screenfull from 'screenfull';

import Cover from '../cover/Cover';
import Items from '../items/Items';
import { createModal } from '../../Utils';

export default class Story extends HTMLElement {
  constructor(story){
    super();
    this.story = story;
    this.classList.add('story');
    this.addEventListener('click', this._openStory.bind(this));
  }

  _openStory(event){
    const hasModal = document.querySelector('.modal.modal-stories');
    const modal = hasModal ? document.querySelector('.modal.modal-stories') : createModal();
    const items = new Items(this.story);
    modal.appendChild(items);
    // screenfull.request(modal);
  }

  _render(){
    const index = this.getAttribute('data-index');
    const preview = this.story.preview || this.story.slides[0].preview || this.story.slides[0].src;
    const title = this.story.title;
    const cover = new Cover(preview, title);
    this.appendChild(cover);
    cover._render();
  }
}
