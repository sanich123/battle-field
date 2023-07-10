import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';
import { ClientsObject } from '../types/types.js';
import { updateRoom } from './update-room.js';
import { getStringifiedObject } from '../utils/utils.js';

export function createRoom(connectionId: string, clients: ClientsObject, wsServer: WebSocketServer) {
  const { name, index } = database.getNameAndIndex(connectionId);
  console.log(`findedUser is ${name}, ${index}`);
  database.pushRoomToRooms(name, index);
  clients[connectionId].send(getStringifiedObject(TYPES.updateRoom, database.getRooms()));
  console.log(`Sent to frontend client ${connectionId} rooms`, database.getRooms());
  wsServer.clients.forEach((client) => client.send(updateRoom(connectionId)));
}
