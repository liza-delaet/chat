import './chat.html'

let ws;
const socketServerURI = 'ws://localhost:4000';

const loginBtn = document.querySelector('#authorization');
const msgBtn = 0;
const logoutBtn = 0;

loginBtn.addEventListener('click', () => {
  const reqBody = {
    event: 'login',
    payload: {}
  }

  ws.send(JSON.stringify(reqBody))
});

msgBtn.addEventListener('click', () => {
  const reqBody = {
    event: 'message',
    payload: {}
  }

  ws.send(JSON.stringify(reqBody))
})

logoutBtn.addEventListener('click', () => {
  const reqBody = {
    event: 'logout',
    payload: {}
  }

  ws.send(JSON.stringify(reqBody))
})

function start(socketURL) {
  ws = new WebSocket(socketURL);

  console.log(ws);
  ws.onmessage = (serverResponse) => {
    const {type} = JSON.parse(serverResponse.data)
    console.log(type);

    switch (type) {
      case 'login':
        console.log('Кто-то залогинился');
        break;
      case 'message':
        console.log('Кто-то отправил сообщение');
        break;
      default:
        console.log('Кто-то вышел из чата');
        break;
    }
  }
}

start(socketServerURI);

console.log(1);