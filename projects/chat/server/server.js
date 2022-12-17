const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 4000}, () => {
  console.log('Сервер стартанул на порте 4000');
})

const clients = new Set();

wss.on('connection', (wsClient) => {
  console.log('connect');

  clients.add(wsClient)

  wsClient.on('message', message => {
    const req = JSON.parse(message.toString())
    console.log(req);
    broadcast(req)
  })

  wsClient.on('close', () => {
    clients.delete(wsClient)
    broadcast({event: 'logout', payload: {data: 'logout'}})
  })
})

function broadcast(param) {
  let res;

  clients.forEach(client => {
    switch (param.event) {
      case 'login':
        res = {type: 'login', payload: {data: 'login'}}
        break;
      case 'message':
        res = {type: 'message', payload: {data: 'message'}}
        break;
      default:
        res = {type: 'logout', payload: {data: 'logout'}}
        break;
    }

    client.send(JSON.stringify(res));
  })
}