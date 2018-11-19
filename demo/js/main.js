class Stories {
  init() {
    const btn = document.getElementById('btnFull');
    const me = this;
    btn.addEventListener('click', function() {
      me.playStories(document.getElementsByClassName('story__items')[0])
    })
  }

  playStories(element) {
    if(element.getElementsByClassName('active').length <= 0){
      element.getElementsByTagName('li')[0].classList.add('active');
      screenfull.request(element);
    }
    this.startProgress(element);
  }

  startProgress() {
    var width = 1;

    const progressElement = document.getElementsByClassName('mybar')[0];
    const id = setInterval(frame, 30);

    const me = this;

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
      activeItem.style.display = 'none';
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      this.startProgress()
      console.log('Nevegando');
    }

  }



}

const story = new Stories();
story.init();


function move() {

}
