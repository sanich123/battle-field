import Server, { WebSocketServer } from 'ws';
import { TYPES } from './types/enums.js';
import { getStatisticInfo, parseReceivedData } from './utils/utils.js';
import { registrateUser } from './actions/registrate-user.js';
import { createRoom } from './actions/create-room.js';
import { createGame } from './actions/create-game.js';
import { setPositions } from './actions/set-positions.js';
import { IncomingMessage } from 'http';

const wsServer = new WebSocketServer({ port: 3000 });

wsServer.on('connection', (ws: Server, req: IncomingMessage) => {
  getStatisticInfo(wsServer.clients.size, req.socket.remoteAddress, wsServer.address());
  const { reg, makeRoom, addUserToRoom, addShips } = TYPES;

  ws.on('message', (receivedData: ArrayBuffer) => {
    const { type, data } = parseReceivedData(receivedData);
    if (type === reg) registrateUser(ws, data);
    else if (type === makeRoom) createRoom(ws);
    else if (type === addUserToRoom) createGame(ws);
    else if (type === addShips) setPositions(data, wsServer);
    else ws.send(JSON.stringify(new Error('Some error occured!')));
  });
  ws.on('error', (err) => console.log(err.message));
  ws.on('close', () => console.log('WebSocket was closed'));
});
