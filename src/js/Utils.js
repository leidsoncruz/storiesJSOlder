import EventEmitter from './EventEmitter';

export const CONSTANTS = {
  timer: 3
}

export const createModal = () => {
  let modal = document.createElement('div');
  modal.classList.add('modal', 'modal-stories');
  document.body.appendChild(modal);
  return modal;
}

export const exit = () => {
  const id = document.querySelector('stories-wrapper').gettIntervalId();
  if(id)clearInterval(id);
  const modal = document.querySelector('.modal.modal-stories');
  if(modal) modal.remove();
  EventEmitter.dispatch('exitStory');
}
