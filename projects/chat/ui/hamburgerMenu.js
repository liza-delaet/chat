export default class HamburgerMenu {
  constructor(element, handler) {
    this.handler = handler;
    this.element = element;
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.handler();
    });
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}