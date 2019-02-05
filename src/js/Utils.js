import EventEmitter from './EventEmitter';

export const CONSTANTS = {
  timer: 3
};

export const createModal = () => {
  let modal = document.createElement('div');
  modal.classList.add('modal', 'modal-stories');
  document.body.appendChild(modal);
  return modal;
};
