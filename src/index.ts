import Server, { WebSocketServer } from 'ws';
import { TYPES } from './types/enums.js';
import { getStatisticInfo, parseReceivedData, setClientsWithIds } from './utils/utils.js';
import { registrateUser } from './actions/registrate-user.js';
import { createRoom } from './actions/create-room.js';
import { setPositions } from './actions/set-positions.js';
import { IncomingMessage } from 'http';
import { ClientsObject } from './types/types.js';
import { attachUserToRoom } from './actions/add-user-to-room.js';

const wsServer = new WebSocketServer({ port: 3000 });
const clients: ClientsObject = {};

wsServer.on('connection', (ws: Server, req: IncomingMessage) => {
  const { reg, makeRoom, addUserToRoom, addShips } = TYPES;

  getStatisticInfo(wsServer, req);
  const { connectionId } = setClientsWithIds(clients, ws);

  ws.on('message', (receivedData: ArrayBuffer) => {
    const { type, data } = parseReceivedData(receivedData);
    console.log(`Received type=${type}, data=${data.toString()}, connectionId=${connectionId }`);
    if (type === reg) registrateUser(ws, wsServer, data, connectionId);
    else if (type === makeRoom) createRoom(connectionId, clients, wsServer);
    else if (type === addUserToRoom) attachUserToRoom(data, wsServer, clients, connectionId);
    else if (type === addShips) setPositions(data, connectionId, clients);
    else ws.send(JSON.stringify(new Error('Some error occured!')));
  });
  ws.on('error', (err) => console.log(err.message));
  ws.on('close', () => console.log('WebSocket was closed'));
});
