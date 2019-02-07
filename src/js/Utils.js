export const CONSTANTS = {
  timer: 3
};

export const createModal = () => {
  let modal = document.createElement('div');
  modal.classList.add('modal', 'modal-stories');
  document.body.appendChild(modal);
  return modal;
};

export const getActivatedSlide = () => {
  const modal = document.querySelector('.modal.modal-stories');
  const story = modal.querySelector('.story__items');
  const slide = story.querySelector('.story__item.active') || story.querySelector('.story__item');
  
  const result = {
    storyPosition: Number(story && story.getAttribute('data-index')) + 1,
    slidePosition: (slide) ? Number(slide.getAttribute('data-index')) : 1
  };

  return result;
};

const _STORY_EVENTS = {
  'open': 'BASE_OPEN',
  'exit': 'BASE_EXIT'
};

const _WRAPPER_EVENTS = {
  'nextStory': 'BASE_NEXT_STORY',
  'previousStory': 'BASE_PREVIOUS_STORY',
  'setVideoClass': 'SET_VIDEO_CLASS'
};

const _SLIDE_EVENTS = {
  'activateSlide': 'BASE_ACTIVATE_SLIDE',
  'nextSlide': 'BASE_NEXT_SLIDE',
  'previousSlide': 'BASE_PREVIOUS_SLIDE',
  'pauseSlide': 'BASE_PAUSE_SLIDE',
  'resumeSlide': 'BASE_RESUME_SLIDE',
  'slidesAvailable': 'SLIDES_AVAILABLE'
};

const _PROGRESS_BAR_EVENTS = {
  'stopProgress': 'BASE_STOP_PROGRESS',
  'removeProgress': 'BASE_REMOVE_PROGRESS',
  'startProgress': 'BASE_START_PROGRESS',
  'toEnd': 'BASE_TO_END',
  'toBeginning': 'BASE_TO_BEGINNING',
  'setDuration': 'BASE_SET_DURATION'
};

const _CALLBACKS_EVENTS = {
  'callbackClickStory': 'CALLBACK_CLICK_STORY',
  'callbackCloseStory': 'CALLBACK_CLOSE_STORY',
  'callbackSlideEnd': 'CALLBACK_SLIDE_END'
};

export const EVENTS = Object.assign(
  {},
  _STORY_EVENTS,
  _WRAPPER_EVENTS,
  _SLIDE_EVENTS,
  _PROGRESS_BAR_EVENTS,
  _CALLBACKS_EVENTS
);
