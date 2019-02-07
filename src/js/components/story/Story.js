import { EVENTS, createModal } from '../../Utils';
import Cover from '../cover/Cover';
import EventEmitter from '../../EventEmitter';
import Modal from '../modal/Modal';
import screenfull from 'screenfull';

export default class Story extends HTMLElement {
  constructor(story) {
    super();
    this.story = story;
    this.classList.add('story');
    this._bindEvents();
    this._bindCustomEvents();
  }

  _onClickStory() {
    EventEmitter.dispatch(EVENTS.open, this);
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

    //for safari IOS
    try {
      screenfull.isFullscreen ? null : screenfull.request(modalDIV);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
  }

  _onExitStory() {
    EventEmitter.dispatch(EVENTS.stopProgress);
    const modal = document.querySelector('.modal.modal-stories');
    if (modal) {
      modal.remove();
    }
  }

  _bindEvents() {
    this.addEventListener('click', this._onClickStory.bind(this));
  }

  _bindCustomEvents() {
    EventEmitter.clear(EVENTS.exit, EVENTS.open);
    EventEmitter.on(EVENTS.exit, this._onExitStory.bind(this));
    EventEmitter.on(EVENTS.open, this._onOpenStory.bind(this));
  }

  render() {
    const preview = this.story.preview || this.story.slides[0].preview || this.story.slides[0].src;
    const title = this.story.title;
    const cover = new Cover(preview, title);
    this.appendChild(cover);
    cover.render();
  }
}
