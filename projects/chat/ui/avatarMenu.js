export default class AvatarMenu {
  constructor(element) {
    this.element = element;
    this.avatarCancel = element.querySelector('[data-role=avatar-cancel]');
    this.avatarSave = element.querySelector('[data-role=avatar-save]');
    this.avatarCancel.addEventListener('click', () => {
      this.hide();
    });
    this.avatarSave.addEventListener('click', () => {
      this.hide();
    });
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
