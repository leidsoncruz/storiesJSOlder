let EMITTER = {
  target: null,
  listeners: {}
};

const _checkTargetDefined = target => {
  if (!target) {
    throw new Error('EventEmitter \'Target\' is not defined. Call method \'define\' with a valid element as parameter.');
  }
};

const define = element => {
  EMITTER.target = element;
};

const on = (eventName = '', callback = () => {}) => {
  _checkTargetDefined(EMITTER.target);

  EMITTER.target.addEventListener(eventName, callback);
  EMITTER.listeners[eventName] = callback;

  console.log('emitter[on]: ', eventName, callback.name);
};

const off = (eventName = '') => {
  _checkTargetDefined(EMITTER.target);

  if (EMITTER.listeners[eventName]) {
    EMITTER.target.removeEventListener(eventName, EMITTER.listeners[eventName]);
    EMITTER.listeners[eventName] = null;
  }

  console.log('emitter[off]: ', eventName);
};

const dispatch = (eventName = '', detail = null) => {
  let event = new CustomEvent(eventName, { detail });

  _checkTargetDefined(EMITTER.target);

  EMITTER.target.dispatchEvent(event);

  console.log('emitter[dispatch]: ', eventName, detail, !EMITTER.listeners[eventName] ? 'Not listened' : 'Listened');
};

const clear = (...args) => {
  const events = args.length > 0 ? args : Object.keys(EMITTER.listeners);

  events.forEach(off);

  console.log('emitter[clear]: ', events, EMITTER.listeners);
};

export default {
  define, on, off, dispatch, clear
};
