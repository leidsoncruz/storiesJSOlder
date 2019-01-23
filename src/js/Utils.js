export const createModal = () => {
  let modal = document.createElement('div');
  modal.classList.add('modal', 'modal-stories');
  return modal;
}


export const exit = () => {
  // if(idInterval)clearInterval(idInterval);
  const modal = document.querySelector('.modal.modal-stories');
  if(modal) modal.remove();
}