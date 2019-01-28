let target;

const _checkTargetDefined = (target) => {
  if (!target) {
    throw new Error('EventEmitter \'Target\' is not defined. Call method \'defineTarget\' with a valid element as parameter.');
  }
}

const defineTarget = (element) => {
  target = element;
};

const on = (eventName = '', callback = () => {}) => {
  _checkTargetDefined(target);

  target.addEventListener(eventName, callback);
};

const off = (eventName = '', callback = () => {}) => {
  _checkTargetDefined(target);

  target.removeEventListener(eventName, callback)
};

const dispatch = (eventName = '', detail = null) => {
  let event = new CustomEvent(eventName, { detail });

  _checkTargetDefined(target);

  target.dispatchEvent(event);
};


export default {
  defineTarget, on, off, dispatch
};
