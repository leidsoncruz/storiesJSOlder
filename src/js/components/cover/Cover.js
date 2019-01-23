export default class Cover extends HTMLElement {
  constructor(preview, title){
    super();
    this.preview = preview;
    this.title = title;
    this.classList.add('story__cover');
  }

  _render(){
    this.innerHTML = `<img src=${this.preview} alt=${this.title} />`
  }
}
