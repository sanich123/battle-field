import Server, { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';
import { updateRoom } from './update-room.js';

export function registrateUser(ws: Server, wsServer: WebSocketServer, data: string, id: string) {
  const { name } = JSON.parse(data);
  database.setUser(name, id);

  const { name: userName, index, id: connectionId } = database.getNameAndIndex(id);

  const stringifiedObject = JSON.stringify({
    type: TYPES.reg,
    data: JSON.stringify({
      name: userName,
      index,
      error: false,
      errorText: 'Some error',
    }),
    id: 0,
  });
  ws.send(stringifiedObject);
  console.log(`Sent user=${userName}, index=${index}, connection=${connectionId} to front-end`);
  wsServer.clients.forEach((client) => client.send(updateRoom(id)));
}
