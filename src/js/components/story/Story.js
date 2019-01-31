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

  openStory(){
    const hasModal = document.querySelector('.modal.modal-stories');
    const modal = hasModal ? document.querySelector('.modal.modal-stories') : createModal();
    const items = new Items(this.story);
    this.setAttribute('active', true);
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
    this.addEventListener('click', () => {
      EventEmitter.dispatch('openStory');
      this.openStory();
    });
  }

  _bindCustomEvents() {
    EventEmitter.clear('exitStory');
    EventEmitter.on('exitStory', this.onExitStory.bind(this));
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
