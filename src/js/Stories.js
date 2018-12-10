import screenfull from 'screenfull';

const StoriesJS = (wrapper, options) => {
  let currentElPost = '';
  let currentDataIndex = 0;
  let id = 0;

  const optionsDefault = {
    stories: [],
  };

  const returnDefault = param => optionsDefault[param] || null;

  const get = (param) => {
    if (!param) return false;
    try {
      if (!options[param]) return returnDefault(param);
      return options[param];
    } catch (e) {
      return returnDefault(param);
    }
  };

  const getCallBack = (param) => {
    if (!param) return false;
    try {
      if (!options.callbacks[param]) return () => {};
      return options.callbacks[param];
    } catch (e) {
      return () => {};
    }
  };

  const transformer = data => ({ ...data });

  const bindElementsWithFn = (arrElements, event, fn) => {
    for (let i = 0; i <= arrElements.length - 1; i += 1) {
      arrElements[i].addEventListener(event, function () {
        fn(this);
      });
    }
  };

  const hideElements = (arrElements) => {
    for (let i = 0; i <= arrElements.length - 1; i += 1) {
      arrElements[i].style.display = 'none';
    }
  };

  const removeAttributesFromElements = (arrElements, attribute) => {
    for (let i = 0; i <= arrElements.length - 1; i += 1) {
      arrElements[i].removeAttribute(attribute);
    }
  };

  const changeScreen = () => {
    screenfull.on('change', () => {
      if (!screenfull.isFullscreen) exit(false);
    });
  };

  const bindOpenStory = () => {
    const stories = document.getElementsByClassName('story__cover');
    bindElementsWithFn(stories, 'click', openStory);
  };

  const bindBtnsPrevSlide = () => {
    const btnsPrevSlide = document.querySelectorAll('.story > .story__items > .btn-prev');
    bindElementsWithFn(btnsPrevSlide, 'click', prevSlide);
  };

  const bindBtnsNextSlide = () => {
    const btnsNextSlide = document.querySelectorAll('.story > .story__items > .btn-next');
    bindElementsWithFn(btnsNextSlide, 'click', nextSlide);
  };

  const bindDownSlide = () => {
    const stories = document.querySelectorAll('.story__item');
    bindElementsWithFn(stories, 'touchstart', onTouchStartActiveSlide);
    bindElementsWithFn(stories, 'mousedown', onTouchStartActiveSlide);
  };

  const bindUpSlide = () => {
    const stories = document.querySelectorAll('.story__item');
    bindElementsWithFn(stories, 'touchend', onTouchEndActiveSlide);
    bindElementsWithFn(stories, 'mouseup', onTouchEndActiveSlide);
  };

  const bindBtnsCloseSlide = () => {
    const btnsCloseSlide = document.querySelectorAll('.story__items > .btn-close > span');
    bindElementsWithFn(btnsCloseSlide, 'click', exit);
  };

  const initBindMyEvents = () => {
    bindOpenStory();
    bindBtnsPrevSlide();
    bindBtnsNextSlide();
    bindBtnsCloseSlide();
    bindDownSlide();
    bindUpSlide();
  };

  const openStory = (element) => {
    currentElPost = element.parentNode.querySelector('.story__items');
    playStories(currentElPost);
    getCallBack('openStory')(currentElPost);
  };

  const exit = (callExitScreen=true) => {
    if (id) clearInterval(id);
    const activeStory = document.querySelector('li.story__item.active');

    if (activeStory) {
      console.log('[EXIT] SAINDO');
      currentElPost.querySelector(`.progress-bar[data-index="${currentDataIndex}"] > .mybar`).style.width = '0%';
      const parentActive = activeStory.parentElement;
      activeStory.classList.remove('active');
      parentActive.classList.remove('current');
      if(callExitScreen) screenfull.exit();
      getCallBack('exit')(activeStory);
    }
  };

  const nextSlide = () => {
    console.log('[CLICK] NEXT ITEM');
    const activeItem = document.querySelector('li.story__item.active');

    const nextItem = activeItem ? activeItem.nextElementSibling : null;
    const progressElement = currentElPost.querySelector(`.progress-bar[data-index="${currentDataIndex}"] > .mybar`);
    if (nextItem && nextItem.tagName === 'LI') {
      progressElement.style.width = '100%';

      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      currentDataIndex = nextItem.getAttribute('data-index');
      console.log('[NAVEGANDO] NEXT');
      startProgress();
    } else {
      exit();
    }

    getCallBack('nextSlide')(activeItem, nextItem);
  };

  const startProgress = (width = 0) => {
    const progressElement = currentElPost.querySelector(`.progress-bar[data-index="${currentDataIndex}"] > .mybar`);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        nextSlide();
      } else {
        width += 1;
        progressElement.style.width = `${width}%`;
      }
    }

    console.log('[START] PROGRESS');

    clearInterval(id);
    id = setInterval(frame, 30);
    getCallBack('currentSlide')(currentElPost.parentNode, currentElPost.querySelector('.active'));
  };

  const prevSlide = () => {
    console.log('[CLICK] PREVIOUS ITEM');
    const activeItem = document.querySelector('li.story__item.active');
    const prevItem = activeItem ? activeItem.previousElementSibling : null;

    const progressElement = currentElPost.querySelector(`.progress-bar[data-index="${currentDataIndex}"] > .mybar`);

    progressElement.style.width = '0%';

    if (prevItem && prevItem.tagName === 'LI') {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      currentDataIndex = prevItem.getAttribute('data-index');
      console.log('[NAVEGANDO] PREVIOUS');
      startProgress();
    } else {
      exit();
    }

    getCallBack('prevSlide')(activeItem, prevItem);
  };

  const onTouchStartActiveSlide = (element) => {
    console.log('[TOUCH START] ACTIVE slide');

    const legenda = element.querySelector('span');
    const progressBar = element.parentNode.querySelector('.progresses-bars');
    const close = element.parentNode.querySelector('.btn-close');

    clearInterval(id);
    hideElements([progressBar, legenda, close]);
    getCallBack('onTouchStartActiveSlide')();
  };

  const onTouchEndActiveSlide = (element) => {
    console.log('[TOUCH END] ACTIVE ITEM');

    const progressBar = element.parentElement.querySelector(`.progress-bar[data-index="${currentDataIndex}"]`);
    const currentProgressWidth = progressBar.querySelector('.mybar').style.width;
    const legenda = element.querySelector('span');
    const close = element.parentNode.querySelector('.btn-close');

    startProgress(parseInt(currentProgressWidth, 10));
    removeAttributesFromElements([progressBar.parentNode, legenda, close], 'style');
    getCallBack('onTouchEndActiveSlide')();
  };

  const playStories = (element) => {
    console.log('Play story');

    element.classList.add('current');

    if (element.getElementsByClassName('active').length <= 0) {
      const li = element.getElementsByTagName('li')[0];
      li.classList.add('active');
      currentDataIndex = li.getAttribute('data-index');
      screenfull.request(element);
    }

    startProgress();
  };

  const renderStoryItem = (storyItem, index) => `<li class="story__item" data-index="${index + 1}"> <img src=${storyItem.src}  /> <span>${storyItem.title}</span> </li>`;

  const renderProgress = totalBars => Array(totalBars + 1).join(1).split('').map((x, i) => i)
    .map(index => `<div class="progress-bar" data-index="${index + 1}"> <div class="mybar"></div></div>`);

  const renderStory = story => `<div class="story"><div class="story__cover"> <img src=${story.preview} alt="${story.title}" /> </div> <ul class="story__items"> <div class="btn-prev"></div> <div class="btn-next"></div> <div class="progresses-bars"> ${renderProgress(story.slides.length)} </div> <div class="btn-close"> <span>X</span> </div> ${story.slides.map(renderStoryItem).join('')} </ul> </div>`;

  const render = () => {
    const div = document.createElement('div');
    div.className = 'post-stories';

    options = get('transformer') ? get('transformer')(options) : transformer(options);

    const html = `${get('stories').map(renderStory).join('')}`;

    div.innerHTML = html;

    if (document.querySelector(wrapper)) {
      wrapper.appendChild(div);
    } else {
      document.body.appendChild(div);
    }
  };

  render();
  changeScreen();
  initBindMyEvents();
};

const opt = {
  stories: [{
    title: 'poe',
    preview: 'http://localhost:8001/zuck_files/1.jpg',
    slides: [{
      title: 't1',
      src: 'http://localhost:8001/zuck_files/1.jpg'
    }, {
      title: 't2',
      src: 'http://localhost:8001/zuck_files/8.jpg'
    }],
  }, {
    title: 'po2',
    preview: 'http://localhost:8001/zuck_files/2.jpg',
    slides: [{
      title: 't2',
      src: 'http://localhost:8001/zuck_files/2.jpg'
    }]
  }],
  callbacks: {
    // onTouchStartActiveSlide: () => {console.log('apertou');},
    // onTouchEndActiveSlide: () => {console.log('saiu');},
    // prevSlide: (activeItem, prevItem) => {console.log('fui', activeItem, prevItem);},
    // openStory: (currentElPost) => {console.log('foi2', currentElPost)},
    // exit: (activeItem) => {console.log('saiu', activeItem);},
    // currentSlide: (story, activeItem) => {
    //   console.log('vendo agr', story.parentElement, activeItem);
    // }
  },
  // transformer: (data) => {
    //retornando options inteiro
    // console.log( data );
    // return {
    //   ...data
    // }
  // }
};

StoriesJS(null, opt);

export default StoriesJS;
