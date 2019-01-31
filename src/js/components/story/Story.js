import screenfull from 'screenfull';

import Cover from '../cover/Cover';
import Items from '../items/Items';
import { createModal } from '../../Utils';
import EventEmitter from '../../EventEmitter';

export default class Story extends HTMLElement {
  constructor(story){
    super();
    this.story = story;
    this.classList.add('story');
    this._bindEvents();
    this._bindCustomEvents();
  }

  onOpenStory(){
    const hasModal = document.querySelector('.modal.modal-stories');
    const modal = hasModal ? document.querySelector('.modal.modal-stories') : createModal();
    const items = new Items(this.story);
    this.setAttribute('data-active', true);
    items.setAttribute('data-index', this.getAttribute('data-index'));

    const oldItems = modal.querySelector('story-items');
    if(oldItems) modal.removeChild(oldItems);

    modal.appendChild(items);
    screenfull.isFullscreen ? null : screenfull.request(modal);
  }

  onExitStory() {
      const id = document.querySelector('stories-wrapper').gettIntervalId();
      if(id)window.clearInterval(id);
      const modal = document.querySelector('.modal.modal-stories');
      if(modal) modal.remove();
      // EventEmitter.clear();
  }

  _bindEvents() {
    this.addEventListener('click', this.onOpenStory.bind(this));
  }

  _bindCustomEvents() {
    EventEmitter.clear('exitStory', 'openStory');
    EventEmitter.on('exitStory', this.onExitStory.bind(this));
    EventEmitter.on('openStory', this.onOpenStory.bind(this));
  }

  render(){
    const index = this.getAttribute('data-index');
    const preview = this.story.preview || this.story.slides[0].preview || this.story.slides[0].src;
    const title = this.story.title;
    const cover = new Cover(preview, title);
    this.appendChild(cover);
    cover.render();
  }
}
