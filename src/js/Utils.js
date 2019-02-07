export const CONSTANTS = {
  timer: 3
};

export const createModal = () => {
  let modal = document.createElement('div');
  modal.classList.add('modal', 'modal-stories');
  document.body.appendChild(modal);
  return modal;
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

export const EVENTS = Object.assign(
  {},
  _STORY_EVENTS,
  _WRAPPER_EVENTS,
  _SLIDE_EVENTS,
  _PROGRESS_BAR_EVENTS
);
