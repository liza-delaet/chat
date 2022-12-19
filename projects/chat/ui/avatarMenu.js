export default class AvatarMenu {
  constructor(element, sendUpload) {
    this.element = element;
    this.sendUpload = sendUpload;
    this.avatarCancel = element.querySelector('[data-role=avatar-cancel]');
    this.avatarSave = element.querySelector('[data-role=avatar-save]');
    this.avatarCancel.addEventListener('click', () => {
      this.hide();
    });
    this.avatarSave.addEventListener('click', () => {
      this.sendUpload();
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
