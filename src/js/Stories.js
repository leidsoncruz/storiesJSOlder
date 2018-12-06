const Stories = (wrapper, options) => {
  let currentElPost = '';
  let currentDataIndex = 0;
  let id = 0;

  const get = (param) => {
    if(!param) return false;
    return options[param] || null;
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



};

export default Stories;
