import Server, { WebSocketServer } from 'ws';
import { ClientsObject } from '../types/types.js';
import { registrateUser } from '../actions/registrate-user.js';
import { createRoom } from '../actions/create-room.js';
import { attachUserToRoom } from '../actions/add-user-to-room.js';
import { setPositions } from '../actions/set-positions.js';
import { handleAttack } from '../actions/handle-attack.js';
import { TYPES } from '../types/enums.js';

export function router(
  type: string,
  data: string,
  connectionId: string,
  ws: Server,
  wsServer: WebSocketServer,
  clients: ClientsObject,
) {
  const { reg, makeRoom, addUserToRoom, addShips, attack, randomAttack } = TYPES;
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
    case randomAttack:
    case attack:
      handleAttack(data, wsServer);
      break;
    default:
      ws.send(JSON.stringify(new Error('Some error occured!')));
  }
}
