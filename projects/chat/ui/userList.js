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

    // for (const name of this.items) {
    //   const element = document.createElement('li');
    //   element.classList.add('user-list-item');
    //   element.innerHTML = `
    //   <li class="user">
    //           <div class="user__avatar">
    //             <img src="url(projects/chat/photos/${name}.png?t=${Date.now()})" class="users__avatar-icon">
    //           </div>
    //           <div class="user__info">
    //             <span class="user__name" data-role="user-name">${name}</span>
    //             <span class="user__lastmessage">Last message!</span>
    //           </div>
    //         </li>
    //   `
    //   // element.textContent = name;
    //   fragment.append(element);
    // }
    for(const user of this.items.keys()) {
      const element = document.createElement('li');
      element.classList.add('user-list-item');
      element.innerHTML = `
      <li class="user">
              <div class="user__avatar">
                <img src="/chat/ws/photos/${user}.png?t=${Date.now()}" class="users__avatar-icon">
              </div>
              <div class="user__info">
                <span class="user__name" data-role="user-name">${user}</span>
                <span class="user__lastmessage">${this.items.get(user)}</span>
              </div>
            </li>
      `
      fragment.append(element);
    }

    this.element.append(fragment);
  }

  add(name, lastMessage) {
    this.items.set(name, lastMessage);
    this.buildDOM();
    if(this.items.size === 1) {
      this.counter.textContent = this.items.size + " участник";
    } else {
      this.counter.textContent = this.items.size + " участников";
    }
  }

  remove(name) {
    // this.items.remove(name);
    this.items.delete(name);
    this.buildDOM();
  }
}
