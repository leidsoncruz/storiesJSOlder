import { exit } from '../Utils';

export default class ButtonClose extends HTMLElement {
  constructor(){
    super();
    this.classList.add('btn-close');
    this._render();
    this.addEventListener('click', exit.bind(this))
  }

  _render(){
    this.innerHTML = "<span>X</span>";
  }
}
