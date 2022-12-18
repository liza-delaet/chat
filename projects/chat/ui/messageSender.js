export default class MessageSender {
  constructor(element, onSend) {
    this.onSend = onSend;
    this.messageInput = element.querySelector('[data-role=message-input]');
    this.messageSendButton = element.querySelector('[data-role=message-send-button]');

    this.messageSendButton.addEventListener('click', () => {
      const message = this.messageInput.value.trim();

      if (message) {
        this.onSend(message);
      }
    });

    this.enterHandler = function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        element.querySelector('[data-role=message-send-button]').click();
      }
    };
  }
  bindEnter() {
    document.querySelector(".app")
    .addEventListener("keyup", this.enterHandler);
  }

  clear() {
    this.messageInput.value = '';
  }
}
