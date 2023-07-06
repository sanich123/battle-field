import { WebSocketServer } from 'ws';
import { database } from './database/database.js';
import { TYPES } from './types/enums.js';

const websocketServer = new WebSocketServer({ port: 3000 });

websocketServer.on('connection', (ws) => {
  console.log('The server is started!');
  ws.on('error', console.error);
  ws.on('message', (receivedData) => {
    const { type, data, id } = JSON.parse(receivedData.toString());
    database.setUser(data);
    console.log(type === TYPES.reg);
    if (type === TYPES.reg) {
      const { name } = database.getUser();
      const stringifiedObject = JSON.stringify({
        type: TYPES.reg,
        data: JSON.stringify({
          name,
          index: 0,
          error: false,
          errorText: 'Some error',
        }),
        id: 0,
      });
      ws.send(stringifiedObject);
    }

    console.log(type, data, id);
  });

  ws.send('something');
});
