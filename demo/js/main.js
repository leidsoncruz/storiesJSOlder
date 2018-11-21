class Stories {
  constructor(){
    this.currentElPost = '';
    this.currentDataIndex = 0;
    this.init();
  }

  init() {
    const stories = document.getElementsByClassName('story');
    const me = this;
    for(var i=0; i<= stories.length-1; i++){
      stories[i].addEventListener('click', function() {
        me.currentElPost = this.getElementsByClassName('story__items')[0];
        me.playStories(me.currentElPost)
      })
    }

  }

  playStories(element) {
    console.log('Play story');

    element.classList.add('current');

    if(element.getElementsByClassName('active').length <= 0){
      const li = element.getElementsByTagName('li')[0];
      li.classList.add('active');
      this.currentDataIndex = li.getAttribute('data-index');
      screenfull.request(element);
    }

    this.startProgress();
  }

  startProgress() {
    console.log('Start progress');

    var width = 0;
    const me = this;
    const progressElement = this.currentElPost.querySelector(`.progress-bar[data-index="${this.currentDataIndex}"] > .mybar`);

    const id = setInterval(frame, 30);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        me.nextItem();
      } else {
        width++;
        progressElement.style.width = width + '%';
      }
    }
  }

  nextItem(progress) {
    const activeItem = document.querySelector('li.story__item.active');
    const nextItem = activeItem.nextElementSibling;

    if(nextItem && nextItem.tagName == 'LI'){
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      this.currentDataIndex = nextItem.getAttribute('data-index');
      this.startProgress()
      console.log('Nevegando');
    }else{
      this.exit();
    }

  }

  exit(){
    console.log('Saindo');
    const activeStory = document.querySelector('li.story__item.active');
    const parentActive = activeStory.parentElement;
    activeStory.classList.remove('active');
    parentActive.classList.remove('current');
    screenfull.exit();
  }


}

const story = new Stories();
