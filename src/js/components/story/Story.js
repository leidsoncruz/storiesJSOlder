import { EVENTS, createModal, getActivatedSlide } from '../../Utils';
import Cover from '../cover/Cover';
import EventEmitter from '../../EventEmitter';
import Modal from '../modal/Modal';
import screenfull from 'screenfull';

export default class Story extends HTMLElement {
  constructor(story) {
    super();
    this.story = story;
    this.classList.add('story');

    this._onExitStory = this._onExitStory.bind(this);
    this._onOpenStory = this._onOpenStory.bind(this);

    this._bindEvents();
    this._bindCustomEvents();
  }

  _onClickStory() {
    EventEmitter.dispatch(EVENTS.open, this);
    EventEmitter.dispatch(EVENTS.callbackClickStory, getActivatedSlide());
  }

  _getActivatedSlide() {
    const modal = document.querySelector('.modal.modal-stories');
    const story = modal.querySelector('.story__items');
    const slide = story.querySelector('.story__item.active') || story.querySelector('.story__item');
    
    const result = {
      storyPosition: Number(story && story.getAttribute('data-index')) + 1,
      slidePosition: (slide) ? Number(slide.getAttribute('data-index')) : 1
    };

    return result;
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
    EventEmitter.dispatch(EVENTS.callbackCloseStory, getActivatedSlide());
    EventEmitter.dispatch(EVENTS.callbackSlideEnd, getActivatedSlide());
    const modal = document.querySelector('.modal.modal-stories');
    if (modal) {
      modal.remove();
    }
  }

  _bindEvents() {
    this.addEventListener('click', this._onClickStory.bind(this));
  }

  _unbindCustomEvents() {
    EventEmitter.off(EVENTS.exit, this._onExitStory);
    EventEmitter.off(EVENTS.open, this._onOpenStory);
  }

  _bindCustomEvents() {
    this._unbindCustomEvents();
    EventEmitter.on(EVENTS.exit, this._onExitStory);
    EventEmitter.on(EVENTS.open, this._onOpenStory);
  }

  render() {
    const preview = this.story.preview || this.story.slides[0].preview || this.story.slides[0].src;
    const title = this.story.title;
    const cover = new Cover(preview, title);
    this.appendChild(cover);
    cover.render();
  }
}
