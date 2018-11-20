class Stories {
  constructor(){
    this.currentElPost = '';
  }

  init() {
    const btn = document.getElementById('btnFull');
    const me = this;
    btn.addEventListener('click', function() {
      me.currentElPost = document.getElementsByClassName('story__items')[0];
      me.playStories(me.currentElPost)
    })
  }

  playStories(element) {
    console.log('Play story');

    if(element.getElementsByClassName('active').length <= 0){
      element.getElementsByTagName('li')[0].classList.add('active');
      element.style.display="block";
      screenfull.request(element);
    }

    this.startProgress();
  }

  startProgress() {
    console.log('Start progress');
    var width = 1;

    const progressElement = this.currentElPost.getElementsByClassName('mybar')[0];
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
    }else{
      this.exit();
    }

  }

  exit(){
    console.log('Saindo');
    const ulActive = document.querySelector('li.story__item.active').parentElement;
    ulActive.style.display = "none";
    screenfull.exit();
  }


}

const story = new Stories();
story.init();


function move() {

}
