var StoriesJS = (wrapper, options) => {
  let currentElPost = '';
  let currentDataIndex = 0;
  let id = 0;
  const d = document;

  const optionsDefault = {
    stories: []
  };

  const get = (param) => {
    if(!param) return false;
    try {
      return options[param];
    } catch (e) {
      return optionsDefault[param] || null;
    }
  }

  const bindElementsWithFn = (arrElements, event, fn) => {
    for(var i=0;i<=arrElements.length-1;i++){
      arrElements[i].addEventListener(event, function(){
        fn();
      });
    };
  }

  const hideElements = (arrElements) => {
    for(var i=0; i<=arrElements.length-1; i++){
      arrElements[i].style.display = "none";
    }
  }

  const removeAttributesFromElements = (arrElements, attribute) => {
    for(var i=0; i<=arrElements.length-1; i++){
      arrElements[i].removeAttribute(attribute);
    }
  }

  const renderStory = (story) => {
    return `<div class="story"><div class="story__cover"> <img src=${story.preview} alt="${story.title}" /> </div> <ul class="story__items"> <div class="btn-prev"></div> <div class="btn-next"></div> <div class="progresses-bars"> ${renderProgress(story.slides.length)} </div> <div class="close"> <span>X</span> </div> ${story.slides.map(renderStoryItem)} </ul> </div>`;
  }

  const renderProgress = (totalBars) => {
    return Array(totalBars + 1).join(1).split('').map((x, i) => i).map(function(index, bar){
      return `<div class="progress-bar" data-index="${index+1}"> <div class="mybar"></div></div>`
    });
  }

  const renderStoryItem = (storyItem, index) => {
    return `<li class="story__item" data-index="${index+1}"> <img src=${storyItem.src}  /> <span>${storyItem.title}</span> </li>`;
  }

  const render = () => {
    const div = d.createElement("div");
    div.className = "post-stories";

    const html = `${get('stories').map(renderStory).join('')}`;

    div.innerHTML = html;

    if(d.querySelector(wrapper)){
      wrapper.appendChild(div);
    }else{
      d.body.appendChild(div);
    }

  }

  const openStory = () => {
    currentElPost = this.parentNode.getElementsByClassName('story__items')[0];
    playStories(currentElPost);
  }

  const startProgress = (width=0) => {
    console.log('[START] PROGRESS');

    const progressElement = currentElPost.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);

    clearInterval(id);
    id = setInterval(frame, 30);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        nextSlide();
      } else {
        width++;
        progressElement.style.width = width + '%';
      }
    }
  }

  const prevSlide = () => {
    console.log('[CLICK] PREVIOUS ITEM');
    const activeItem = document.querySelector('li.story__item.active');
    const prevItem = activeItem.previousElementSibling;
    const progressElement = currentElPost.querySelector(`.progress-bar[data-index="${currentDataIndex}"] > .mybar`);

    progressElement.style.width = '0%';

    if(prevItem && prevItem.tagName == 'LI'){
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      currentDataIndex = prevItem.getAttribute('data-index');
      console.log('[NAVEGANDO] PREVIOUS');
      startProgress()
    }else{
      exit();
    }
  }

  const nextSlide = () => {
    console.log('[CLICK] NEXT ITEM');
    const activeItem = document.querySelector('li.story__item.active');
    const nextItem = activeItem.nextElementSibling;
    const progressElement = currentElPost.querySelector(`.progress-bar[data-index="${currentDataIndex}"] > .mybar`);

    progressElement.style.width = '100%';

    if(nextItem && nextItem.tagName == 'LI'){
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      currentDataIndex = nextItem.getAttribute('data-index');
      console.log('[NAVEGANDO] NEXT');
      startProgress()
    }else{
      exit();
    }
  }

  const exit = () => {
    if(id) clearInterval(id);
    const activeStory = document.querySelector('li.story__item.active');

    if(activeStory){
      console.log('[EXIT] SAINDO');
      const parentActive = activeStory.parentElement;
      activeStory.classList.remove('active');
      parentActive.classList.remove('current');
      screenfull.exit();
    }
  }

  const onTouchStartActiveSlide = () => {
    console.log('[TOUCH START] ACTIVE slide');

    const legenda = this.querySelector('span');
    const progressBar = this.parentNode.querySelector('.progresses-bars');
    const close = this.parentNode.querySelector('.close');

    clearInterval(id);
    hideElements([progressBar, legenda, close]);

  }

  const onTouchEndActiveSlide = () => {
    console.log('[TOUCH END] ACTIVE ITEM');

    const progressBar = this.parentElement.querySelector(`.progress-bar[data-index="${currentDataIndex}"]`);
    const currentProgressWidth = progressBar.querySelector('.mybar').style.width;
    const legenda = this.querySelector('span');
    const close = this.parentNode.querySelector('.close');

    startProgress(parseInt(currentProgressWidth));
    removeAttributesFromElements([progressBar.parentNode, legenda, close], 'style');
  }

  const changeScreen = () => {
    screenfull.on('change', () => {
      if(!screenfull.isFullscreen) exit();
	  });
  }

  const bindOpenStory = () => {
    const stories = document.getElementsByClassName('story__cover');
    bindElementsWithFn(stories, 'click', openStory);
  }

  const bindBtnsCloseSlide = () => {
    const btnsCloseSlide = document.querySelectorAll('.story__items > .close > span');
    bindElementsWithFn(btnsCloseSlide, 'click', exit);
  }

  const bindBtnsNextSlide = () => {
    const btnsNextSlide = document.querySelectorAll('.story > .story__items > .btn-next');
    bindElementsWithFn(btnsNextSlide, 'click', nextSlide);
  }

  const bindBtnsPrevSlide = () => {
    const btnsPrevSlide = document.querySelectorAll('.story > .story__items > .btn-next');
    bindElementsWithFn(btnsPrevSlide, 'click', prevSlide);
  }

  const playStories = (element) => {
    console.log('Play story');

    element.classList.add('current');

    if(element.getElementsByClassName('active').length <= 0){
      const li = element.getElementsByTagName('li')[0];
      li.classList.add('active');
      currentDataIndex = li.getAttribute('data-index');
      screenfull.request(element);
    }

    startProgress();
  }


  render();

};


export default StoriesJS;
