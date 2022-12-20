import { sanitize } from '../utils';
export default class UserList {
  constructor(element, counter) {
    this.element = element;
    // this.items = new Set();
    this.items = new Map();
    this.counter = counter;
  }

  buildDOM() {
    const fragment = document.createDocumentFragment();
    this.element.innerHTML = '';

    for(const user of this.items.keys()) {
      const element = document.createElement('li');
      element.classList.add('user-list-item');
      element.innerHTML = `
      <li class="user">
              <div class="user__avatar" data-role="user-list-avatar" data-user=${sanitize(user)}
              style="background-image: url(/chat/ws/photos/${user}.png?t=${Date.now()})" >
              </div>
              <div class="user__info">
                <span class="user__name" data-role="user-name">${user}</span>
                <span class="user__lastmessage" data-role="user-list-lastmessage" data-user=${user}>${this.items.get(user)}</span>
              </div>
            </li>
      `
      fragment.append(element);
    }

    this.element.append(fragment);
  }

  add(name) {
    this.items.set(name, "");
    this.buildDOM();
    if(this.items.size === 1) {
      this.counter.textContent = this.items.size + " участник";
    } else {
      this.counter.textContent = this.items.size + " участников";
    }
  }

  updateUserLastMessage(name, lastMessage) {
    this.items.set(name, lastMessage);
    document.querySelector(
      `[data-role=user-list-lastmessage][data-user="${name}"]`
    ).textContent = lastMessage;
  }

  remove(name) {
    // this.items.remove(name);
    this.items.delete(name);
    this.buildDOM();
  }
}
