export default class UploadAvatarMenu {
  constructor(element, onUpload) {
    this.element = element;
    this.onUpload = onUpload;
    this.uploadAvatarClose = element.querySelector('[data-role=modal-avatar-close]');
    this.uploadPhotoZone = element.querySelector('[data-role=upload-avatar-zone]');
    this.avatarName = element.querySelector('[data-role=upload-avatar-name]');
    this.uploadAvatar = element.querySelector('[data-role=upload-avatar]' );
    this.uploadAvatarClose.addEventListener('click', () => {
      this.hide();
    });
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
      this.hide();
      }
    });

    this.uploadPhotoZone.addEventListener('dragover', (e) => {
      if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
        e.preventDefault();
      }
    });

    this.uploadPhotoZone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.items[0].getAsFile();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('load', () => this.onUpload(reader.result));
      e.preventDefault();
    });
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }

  set(name) {
    this.uploadAvatar.style.backgroundImage = `url(/chat/ws/photos/${
      name
    }.png?t=${Date.now()}?photo=true)`;
    this.avatarName.textContent = name;
  }
}
