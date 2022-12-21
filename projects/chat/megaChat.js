import LoginWindow from './ui/loginWindow';
import MainWindow from './ui/mainWindow';
import UserName from './ui/userName';
import UserList from './ui/userList';
import UserPhoto from './ui/userPhoto';
import MessageList from './ui/messageList';
import MessageSender from './ui/messageSender';
import WSClient from './wsClient';
import HamburgerMenu from './ui/hamburgerMenu';
import AvatarMenu from './ui/avatarMenu';
import UploadAvatarMenu from './ui/uploadAvatarMenu';
export default class MegaChat {
  constructor() {
    this.wsClient = new WSClient(
      `ws://${location.host}/chat/ws`,
      this.onMessage.bind(this)
    );
    this.userName = "",

    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('#authorization'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(document.querySelector('#chat')),
      userList: new UserList(document.querySelector('[data-role=user-list]'), document.querySelector('[data-role=users-counter]')),
      hamburgerMenu: new HamburgerMenu(
        document.querySelector('#hamburger'),
        this.onHamburgerClick.bind(this)
      ),
      uploadAvatarMenu: new UploadAvatarMenu(
        document.querySelector('#modal-avatar'),
        this.onUpload.bind(this)
        ),
      avatarMenu: new AvatarMenu(
        document.querySelector('#avatar'),
        this.sendUpload.bind(this)
      ),
      messageList: new MessageList(document.querySelector('[data-role=messages-list]')),
      messageSender: new MessageSender(
        document.querySelector('[data-role=message-sender]'),
        this.onSend.bind(this)
      ),
      userPhoto: new UserPhoto(
        document.querySelector('[data-role=user-photo]'),
        this.onUpload.bind(this)
      ),
    };

    this.ui.loginWindow.show();
  }

  showMainWindow() {
    this.ui.mainWindow.show();
  }

  onHamburgerClick() {
    this.ui.uploadAvatarMenu.show();
  }

  onUpload(data) {
    this.ui.uploadAvatarMenu.hide();
    this.ui.avatarMenu.show();
    this.ui.userPhoto.set(data);
  }

  sendUpload() {
    const data = this.ui.userPhoto.get();
    fetch('/chat/ws/upload-photo', {
      method: 'post',
      body: JSON.stringify({
        name: this.userName,
        image: data,
      }),
    });
  }

  onSend(message) {
    this.wsClient.sendTextMessage(message);
    this.ui.messageSender.clear();
  }

  async onLogin(name) {
    await this.wsClient.connect();
    localStorage.setItem("loginName", name);
    this.wsClient.sendHello(name);
    this.ui.uploadAvatarMenu.set(name);
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    this.ui.messageSender.bindEnter();
    this.userName = name;
  }

  onMessage({ type, from, data }) {
    console.log(type, from, data);

    if (type === 'hello') {
      this.ui.userList.add(from);
      this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
    } else if (type === 'user-list') {
      for (const item of data) {
        this.ui.userList.add(item, "");
      }
    } else if (type === 'bye-bye') {
      this.ui.userList.remove(from);
      this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
    } else if (type === 'text-message') {
      this.ui.messageList.add(from, data.message, this.userName);
      this.ui.userList.updateUserLastMessage(from, data.message);
    } else if (type === 'photo-changed') {
      const avatars = document.querySelectorAll(
        `[data-role=user-avatar][data-user=${data.name}]`
      );
      const userListAvatar = document.querySelector(
        `[data-role=user-list-avatar][data-user="${data.name}"]`
      );
      const uploadAvatar = document.querySelector(
        `[data-role=upload-avatar]`
      );

      const date = Date.now();

      for (const avatar of avatars) {
        avatar.style.backgroundImage = `url(/chat/ws/photos/${
          data.name
        }.png?t=${date})`;
      }

      userListAvatar.style.backgroundImage = `url(/chat/ws/photos/${
        data.name
      }.png?t=${date})`;

      if(data.name === this.userName) {
        uploadAvatar.style.backgroundImage = `url(/chat/ws/photos/${
          data.name
        }.png?t=${date}?photo=true)`;
      }
      
    }
  }
}
