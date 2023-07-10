import Server, { WebSocketServer } from 'ws';
import { TYPES } from './types/enums.js';
import { getStatisticInfo, parseReceivedData, setClientsWithIds, showIncomingInfo } from './utils/utils.js';
import { registrateUser } from './actions/registrate-user.js';
import { createRoom } from './actions/create-room.js';
import { setPositions } from './actions/set-positions.js';
import { IncomingMessage } from 'http';
import { ClientsObject } from './types/types.js';
import { attachUserToRoom } from './actions/add-user-to-room.js';
import { handleAttack } from './actions/handle-attack.js';

const wsServer = new WebSocketServer({ port: 3000 });
const clients: ClientsObject = {};

wsServer.on('connection', (ws: Server, req: IncomingMessage) => {
  const { reg, makeRoom, addUserToRoom, addShips, attack, randomAttack } = TYPES;

  getStatisticInfo(wsServer, req);
  const { connectionId } = setClientsWithIds(clients, ws);

  ws.on('message', (receivedData: ArrayBuffer) => {
    const { type, data } = parseReceivedData(receivedData);
    showIncomingInfo(type, data, connectionId);

    switch (type) {
      case reg:
        registrateUser(ws, wsServer, data, connectionId);
        break;
      case makeRoom:
        createRoom(connectionId, clients, wsServer);
        break;
      case addUserToRoom:
        attachUserToRoom(data, wsServer, clients, connectionId);
        break;
      case addShips:
        setPositions(data, connectionId, clients, wsServer);
        break;
      case attack:
      case randomAttack:
        handleAttack(data, wsServer);
        break;
      default:
        ws.send(JSON.stringify(new Error('Some error occured!')));
    }
  });
  ws.on('error', (err) => console.log(err.message));
  ws.on('close', () => console.log('WebSocket was closed'));
});
