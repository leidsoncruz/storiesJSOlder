import screenfull from 'screenfull';
import '../scss/Stories.scss';

export const StoriesJS = (wrapper, options) => {
  let currentElPost, currentStory, activeProgressElement = '';

  let currentDataIndex = 0;
  let id = 0;
  let isVideo = false;

  const optionsDefault = {
    stories: [],
    timer: 30,
    hiddenElements: true
  };

  const returnDefault = param => optionsDefault[param] || null;

  const get = (param) => {
    if (!param) return false;
    try {
      if (options[param] == null) return returnDefault(param);

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

  const parseElements = (elements) => {
    return elements.filter(item => item ? item : null);
  }

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
    bindElementsWithFn(btnsCloseSlide, 'click', () => exit(true));
  };

  const initBindMyEvents = () => {
    bindOpenStory();
    bindBtnsPrevSlide();
    bindBtnsNextSlide();
    bindBtnsCloseSlide();
    bindDownSlide();
    bindUpSlide();
  };

  const playVideo = (videoElement) => {
    videoElement.play();
  }

  const pauseVideo = (videoElement) => {
    videoElement.pause();
  }

  const stopVideo = (videoElement) => {
    videoElement.pause();
    videoElement.currentTime=0;
  }

  const toggleClass = (elements, _class) => {
    for (let i = 0; i <= elements.length - 1; i += 1) {
      elements[i].classList.toggle(_class);
    }
  }

  const openStory = (element, addClass=true) => {
    currentElPost = element.parentNode.querySelector('.story__items');
    currentStory = element.parentNode;

    const storiesPreview = document.querySelectorAll('.post-stories > .story > .story__cover');
    if(addClass) toggleClass(storiesPreview, 'hidden');

    playStories();
    getCallBack('openStory')(currentElPost);
  };

  const playStories = () => {
    console.log('Play story');

    currentStory.classList.add('current');

    if (currentElPost.getElementsByClassName('active').length <= 0) {
      const li = currentElPost.getElementsByTagName('li')[0];
      li.classList.add('active');
      currentDataIndex = li.getAttribute('data-index');
      screenfull.request(currentStory.parentElement);
    }

    startProgress();
  };

  const startProgress = (width=0, timer=optionsDefault.timer) => {
    console.log('[START] PROGRESS');

    activeProgressElement = currentElPost.querySelector(`.progress-bar[data-index="${currentDataIndex}"] > .mybar`);
    clearInterval(id);

    const contentElement = currentElPost.querySelector('.active').children[0];
    isVideo = contentElement.tagName==="VIDEO";
    isVideo ? playVideo(contentElement) : null;

    const timeSlide = Math.floor(contentElement.duration)*10 || timer;

    id = setInterval(frame, timeSlide);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        nextSlide();
      } else {
        width += 1;
        activeProgressElement.style.width = `${width}%`;
      }
    }

    getCallBack('currentSlide')(currentElPost.parentNode, currentElPost.querySelector('.active'));
  };

  const prevSlide = () => {
    console.log('[CLICK] PREVIOUS ITEM');
    const activeItem = currentElPost.querySelector('li.story__item.active');
    const prevItem = activeItem ? activeItem.previousElementSibling : null;
    const prevStory = currentElPost.parentElement.previousElementSibling;

    activeProgressElement.style.width = '0%';

    if(isVideo){
      const videoElement = activeItem.children[0];
      stopVideo(videoElement);
    }

    if (prevItem && prevItem.tagName === 'LI') {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      currentDataIndex = prevItem.getAttribute('data-index');
      console.log('[NAVEGANDO] PREVIOUS');
      startProgress();
    }else if (prevStory && prevStory.classList.contains('story')) {
      activeProgressElement.style.width = '100%';
      currentStory.classList.remove('current');
      activeItem.classList.remove('active');
      openStory(prevStory.querySelector('.story__cover'), false);
    }
    else {
      exit();
    }

    getCallBack('prevSlide')(activeItem, prevItem);
  };

  const nextSlide = () => {
    console.log('[CLICK] NEXT ITEM');

    const activeItem = currentElPost.querySelector('li.story__item.active');
    const nextItem = activeItem ? activeItem.nextElementSibling : null;
    const nextStory = currentElPost.parentElement.nextElementSibling;

    if(isVideo){
      const videoElement = activeItem.children[0];
      stopVideo(videoElement);
    }

    if (nextItem && nextItem.tagName === 'LI') {
      activeProgressElement.style.width = '100%';
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      currentDataIndex = nextItem.getAttribute('data-index');
      console.log('[NAVEGANDO] NEXT');
      startProgress();
    }else if (nextStory && nextStory.classList.contains('story')) {
      activeProgressElement.style.width = '100%';
      currentStory.classList.add('seen');
      currentStory.classList.remove('current');
      activeItem.classList.remove('active');
      openStory(nextStory.querySelector('.story__cover'), false);
    } else {
      currentStory.classList.add('seen');
      exit();
    }

    getCallBack('nextSlide')(activeItem, nextItem);
  };

  const exit = (callExitScreen=true) => {
    if (id) clearInterval(id);
    const activeStory = currentElPost.querySelector('li.story__item.active');

    if (activeStory) {
      console.log('[EXIT] SAINDO');
      const storiesPreview = document.querySelectorAll('.post-stories > .story > .story__cover');

      toggleClass(storiesPreview, 'hidden');
      activeProgressElement.style.width = '0%';
      const parentActive = activeStory.parentElement;
      activeStory.classList.remove('active');
      currentStory.classList.remove('current');

      if(isVideo){
        const videoElement = activeStory.children[0];
        stopVideo(videoElement);
      }

      if(callExitScreen){
        screenfull.exit();
      };
      getCallBack('exit')(activeStory);
    }
  };

  const onTouchStartActiveSlide = (element) => {
    console.log('[TOUCH START] ACTIVE slide');

    //Extrair essa lógica para ser um event para não ficar processando toda vez
    if(get('hiddenElements')){
      const legenda = element.querySelector('span');
      const progressBar = activeProgressElement.parentElement.parentElement;
      const close = element.parentNode.querySelector('.btn-close');
      hideElements(parseElements([progressBar, legenda, close]));
    }

    clearInterval(id);

    isVideo ? pauseVideo(currentElPost.querySelector('.active').children[0]) : null;

    getCallBack('onTouchStartActiveSlide')();
  };

  const onTouchEndActiveSlide = (element) => {
    console.log('[TOUCH END] ACTIVE ITEM');
    const progressBar = activeProgressElement.parentElement.parentElement;
    const currentProgressWidth = activeProgressElement.style.width;

    //Extrair essa lógica para ser um event para não ficar processando toda vez
    if(get('hiddenElements')){
      const legenda = element.querySelector('span');
      const close = element.parentNode.querySelector('.btn-close');
      removeAttributesFromElements(parseElements([progressBar, legenda, close]), 'style');
    }

    startProgress(parseInt(currentProgressWidth, 10));
    getCallBack('onTouchEndActiveSlide')();
  };

  const renderImage = (storyItem, index) => {
    return `<li class="story__item" data-index="${index + 1}"> <img src=${storyItem.src} preload="metadata" /> <span>${storyItem.title}</span> </li>`
  }

  const renderVideo = (storyItem, index) => {
    return `<li class="story__item" data-index="${index + 1}"><video src="${storyItem.src}"></video></li>`;
  }


  const renderFunctions = {
    image: renderImage,
    video: renderVideo
  }

  const renderStoryItem = (storyItem, index) => {
    try {
      return renderFunctions[storyItem.type](storyItem, index) || renderImage(storyItem, index);
    } catch (e) {
      return renderImage(storyItem, index);
    }
  };

  const renderProgress = totalBars => Array(totalBars + 1).join(1).split('').map((x, i) => i)
  .map(index => `<div class="progress-bar" data-index="${index + 1}"> <div class="mybar"></div></div>`).join('');

  const renderStory = (story,idx) => `<div class="story"><div class="story__cover"> <img src=${story.preview || story.slides[0].preview || story.slides[0].src} alt="${story.title}" /> </div> <ul class="story__items"> <div class="btn-prev"></div> <div class="btn-next"></div> <div class="progresses-bars"> ${renderProgress(story.slides.length)} </div> <div class="btn-close"> <span>X</span> </div> ${story.slides.map(renderStoryItem).join('')} </ul></div>`;

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
