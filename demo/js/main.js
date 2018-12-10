class Stories {
  constructor() {
    this.currentElPost = '';
    this.currentDataIndex = 0;
    this.bindOpenClick();
    this.bindBtnNextItem();
    this.bindBtnPrevItem();
    this.bindBtnClose();
    this.changeScreen();
    this.clickActiveItem();
    this.id = 0;
  }

  clickActiveItem() {
    const me = this;
    const stories = document.querySelectorAll('.story__item');
    for (let i = 0; i <= stories.length - 1; i++) {
      stories[i].addEventListener('touchstart', function () {
        console.log('[TOUCH START] ACTIVE ITEM');
        clearInterval(me.id);

        const legenda = this.querySelector('span');
        const progressBar = this.parentNode.querySelector('.progresses-bars');
        const close = this.parentNode.querySelector('.close');

        progressBar.style.display = 'none';
        legenda.style.display = 'none';
        close.style.display = 'none';
      }, false);

      stories[i].addEventListener('mousedown', function () {
        console.log('[TOUCH START] ACTIVE ITEM');
        clearInterval(me.id);
        const legenda = this.querySelector('span');
        const progressBar = this.parentNode.querySelector('.progresses-bars');
        const close = this.parentNode.querySelector('.close');

        progressBar.style.display = 'none';
        legenda.style.display = 'none';
        close.style.display = 'none';
      }, false);

      stories[i].addEventListener('touchend', function () {
        console.log('[TOUCH END] ACTIVE ITEM');
        const progressBar = this.parentElement.querySelector(`.progress-bar[data-index="${me.currentDataIndex}"]`);
        const currentProgressWidth = progressBar.querySelector('.mybar').style.width;

        me.startProgress(parseInt(currentProgressWidth));

        const legenda = this.querySelector('span');
        const close = this.parentNode.querySelector('.close');

        progressBar.parentNode.removeAttribute('style');
        legenda.removeAttribute('style');
        close.removeAttribute('style');
      }, false);

      stories[i].addEventListener('mouseup', function () {
        console.log('[TOUCH END] ACTIVE ITEM');
        const progressBar = this.parentElement.querySelector(`.progress-bar[data-index="${me.currentDataIndex}"]`);
        const currentProgressWidth = progressBar.querySelector('.mybar').style.width;

        me.startProgress(parseInt(currentProgressWidth));

        const legenda = this.querySelector('span');
        const close = this.parentNode.querySelector('.close');

        progressBar.parentNode.removeAttribute('style');
        legenda.removeAttribute('style');
        close.removeAttribute('style');
      }, false);
    }
  }

  changeScreen() {
    screenfull.on('change', () => {
      if (!screenfull.isFullscreen) this.exit();
	  });
  }

  bindBtnClose() {
    const btnsCloseItem = document.querySelectorAll('.story__items > .close > span');
    const me = this;

    for (let i = 0; i <= btnsCloseItem.length - 1; i++) {
      btnsCloseItem[i].addEventListener('click', () => {
        me.exit();
      });
    }
  }

  bindBtnNextItem() {
    const btnsNextItem = document.querySelectorAll('.story > .story__items > .btn-next');
    const me = this;
    for (let i = 0; i <= btnsNextItem.length - 1; i++) {
      btnsNextItem[i].addEventListener('click', () => {
        me.nextItem();
      });
    }
  }

  bindBtnPrevItem() {
    const btnsPrevItem = document.querySelectorAll('.story > .story__items > .btn-prev');
    const me = this;
    for (let i = 0; i <= btnsPrevItem.length - 1; i++) {
      btnsPrevItem[i].addEventListener('click', () => {
        me.prevItem();
      });
    }
  }

  bindOpenClick() {
    const stories = document.getElementsByClassName('story__cover');
    const me = this;

    for (let i = 0; i <= stories.length - 1; i++) {
      stories[i].addEventListener('click', function () {
        me.currentElPost = this.parentNode.getElementsByClassName('story__items')[0];
        me.playStories(me.currentElPost);
      });
    }
  }

  playStories(element) {
    console.log('Play story');
    element.classList.add('current');

    if (element.getElementsByClassName('active').length <= 0) {
      const li = element.getElementsByTagName('li')[0];
      li.classList.add('active');
      this.currentDataIndex = li.getAttribute('data-index');
      screenfull.request(element);
    }

    this.startProgress();
  }

  startProgress(width = 0) {
    console.log('[START] PROGRESS');

    clearInterval(this.id);

    const me = this;
    const progressElement = this.currentElPost.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);

    this.id = setInterval(frame, 30);

    function frame() {
      if (width >= 100) {
        clearInterval(me.id);
        // me.nextItem();
      } else {
        width++;
        progressElement.style.width = `${width}%`;
      }
    }
  }

  prevItem() {
    console.log('[CLICK] PREVIOUS ITEM');
    const activeItem = document.querySelector('li.story__item.active');
    const prevItem = activeItem.previousElementSibling;

    const progressElement = this.currentElPost.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);
    progressElement.style.width = '0%';

    if (prevItem && prevItem.tagName == 'LI') {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      this.currentDataIndex = prevItem.getAttribute('data-index');
      console.log('[NAVEGANDO] PREVIOUS');
      this.startProgress();
    } else {
      this.exit();
    }
  }

  nextItem() {
    console.log('[CLICK] NEXT ITEM');
    const activeItem = document.querySelector('li.story__item.active');
    const nextItem = activeItem.nextElementSibling;

    const progressElement = this.currentElPost.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);
    progressElement.style.width = '100%';

    if (nextItem && nextItem.tagName == 'LI') {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      this.currentDataIndex = nextItem.getAttribute('data-index');
      console.log('[NAVEGANDO] NEXT');
      this.startProgress();
    } else {
      this.exit();
    }
  }

  exit() {
    if (this.id) clearInterval(this.id);
    const activeStory = document.querySelector('li.story__item.active');
    if (activeStory) {
      console.log('[EXIT] SAINDO');
      const parentActive = activeStory.parentElement;
      activeStory.classList.remove('active');
      parentActive.classList.remove('current');
      screenfull.exit();
    }
  }
}

const story = new Stories();
