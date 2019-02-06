import screenfull from 'screenfull';

import Cover from '../cover/Cover';
import Modal from '../modal/Modal';
import { createModal } from '../../Utils';
import EventEmitter from '../../EventEmitter';

export default class Story extends HTMLElement {
  constructor(story) {
    super();
    this.story = story;
    this.classList.add('story');
    this._bindEvents();
    this._bindCustomEvents();
  }

  _onClickStory() {
    EventEmitter.dispatch('openStory', this);
  }

  _onOpenStory(event = {}) {
    const reference = (event && event.detail) || this;
    const hasModal = document.querySelector('.modal.modal-stories');
    const modalDIV = hasModal ? document.querySelector('.modal.modal-stories') : createModal();
    const modalInstance = new Modal(reference.story);
    reference.setAttribute('active', true);
    modalInstance.setAttribute('data-index', reference.getAttribute('data-index'));

    const oldItems = modalDIV.querySelector('story-modal');
    if (oldItems) {
      modalDIV.removeChild(oldItems);
    }

    modalDIV.appendChild(modalInstance);
    try {
      screenfull.isFullscreen ? null : screenfull.request(modalDIV);
    } catch (e) {
      console.log(e);
    }
  }

  _onExitStory() {
    EventEmitter.dispatch('stopProgress');
    const modal = document.querySelector('.modal.modal-stories');
    if (modal) {
      modal.remove();
    }
  }

  _bindEvents() {
    this.addEventListener('click', this._onClickStory.bind(this));
  }

  _bindCustomEvents() {
    EventEmitter.clear('exitStory', 'openStory');
    EventEmitter.on('exitStory', this._onExitStory.bind(this));
    EventEmitter.on('openStory', this._onOpenStory.bind(this));
  }

  render() {
    const index = this.getAttribute('data-index');
    const preview = this.story.preview || this.story.slides[0].preview || this.story.slides[0].src;
    const title = this.story.title;
    const cover = new Cover(preview, title);
    this.appendChild(cover);
    cover.render();
  }
}
