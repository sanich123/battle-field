import { WebSocketServer } from 'ws';
import { database } from './database/database.js';
import { TYPES } from './types/enums.js';
import { parseReceivedData } from './utils/utils.js';
import Server from 'ws';
import { registrateUser } from './actions/registrate-user.js';
import { createRoom } from './actions/create-room.js';
import { createGame } from './actions/create-game.js';
import { startGame } from './actions/start-game.js';

const websocketServer = new WebSocketServer({ port: 3000 });

websocketServer.on('connection', (ws: Server) => {
  const { reg, makeRoom, addUserToRoom, addShips } = TYPES;
  console.log('The server is started!');
  ws.on('error', console.error);
  ws.on('message', (receivedData: ArrayBuffer) => {
    const { type, data, id } = parseReceivedData(receivedData);
    if (type === reg) {
      database.setUser(data);
      registrateUser(ws);
    } else if (type === makeRoom) {
      createRoom(ws);
    } else if (type === addUserToRoom) {
      createGame(ws);
    } else if (type === addShips) {
      const { data } = JSON.parse(receivedData.toString());
      const { ships } = JSON.parse(data);
      database.setPosition(ships);
      console.log(database.getPositionsLength());
      if (database.getPositionsLength() >= 2) {
        startGame(ws);
      }
    }
  });
});
