import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';
import { ClientsObject } from '../types/types.js';
import { updateRoom } from './update-room.js';

export function createRoom(connectionId: string, clients: ClientsObject, wsServer: WebSocketServer) {
  const { name, index } = database.getNameAndIndex(connectionId);
  console.log(`findedUser is ${name}, ${index}`);
  database.pushRoomToRooms(name, index);
  const stringifiedData = JSON.stringify({
    type: TYPES.updateRoom,
    data: JSON.stringify(database.getRooms()),
    id: 0,
  });
  clients[connectionId].send(stringifiedData);
  console.log(`Sent to frontend rooms`, database.getRooms());
  wsServer.clients.forEach((client) => client.send(updateRoom(connectionId)));
}
