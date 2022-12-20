import { sanitize } from '../utils';

export default class MessageList {
  constructor(element) {
    this.element = element;
  }

  add(from, text, userName) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, 0);
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const time = `${hours}:${minutes}`;
    const item = document.createElement('li');
    item.classList.add('message-item');
    let lastUserName = "";
    if(this.element.childElementCount > 0 && !this.element.lastChild.classList.contains('message-item-system')) {
      lastUserName = document.querySelector('[data-role=messages-list]').lastChild.querySelector(".message-item-name").textContent;
    }
    if(from === lastUserName) {
      item.innerHTML = `
      <div class="message-item-right">
        <div class="message-item-header">
            <div class="message-item-name">${sanitize(from)}</div>
        </div>
        <div class="message-item-body">
          <div class="message-item-text">${sanitize(text)}</div>
          <div class="message-item-time">${time}</div>
        </div>
      </div>
      `;
    } 
    else {
      item.classList.add('first-in-group');
      item.innerHTML = `
      <div class="message-item-left">
          <div
          style="background-image: url(/chat/ws/photos/${from}.png?t=${Date.now()})" 
          class="message-item-photo" data-role="user-avatar" data-user=${sanitize(
            from
          )}></div>
      </div>
      <div class="message-item-right">
        <div class="message-item-header">
          <div class="message-item-name">${sanitize(from)}</div>
        </div>
        <div class="message-item-body">
          <div class="message-item-text">${sanitize(text)}</div>
          <div class="message-item-time">${time}</div>
        </div>
      </div>
      `;
    }
    if(from === userName) {
      item.classList.add('own');
    }

    this.element.append(item);
    this.element.parentElement.scrollTop = this.element.parentElement.scrollHeight;
  }

  addSystemMessage(message) {
    const item = document.createElement('li');

    item.classList.add('message-item', 'message-item-system');
    item.textContent = message;

    this.element.append(item);
    this.element.parentElement.scrollTop = this.element.parentElement.scrollHeight;
    
  }
}
