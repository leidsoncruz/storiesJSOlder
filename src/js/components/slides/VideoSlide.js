import SlideBase from './SlideBase';

export default class VideoSlide extends SlideBase {
  _playVideo() {
    if (this.video.readyState >= 2) {
      this._start(this.video.duration);
      this.video.play();
    }
  }

  _touchStartItem(element) {
    super._touchStartItem(element);
    this.video.pause();
  }

  _touchEndtItem(element) {
    super._touchEndtItem(element);
    this.video.play();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.video = this.children[0];
    if (name === 'active' && newValue === 'true') {
      this._playVideo();
      this.video.addEventListener('loadeddata', this._playVideo.bind(this));
    } else if (name === 'active' && newValue !== 'true') {
      this.video.pause();
      this.video.currentTime = 0;
    }
  }

  _render() {
    this.innerHTML = `<video src="${this.slide.src}" preload="auto"></video>`;
  }
}
