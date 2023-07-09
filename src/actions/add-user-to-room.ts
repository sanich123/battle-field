import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { ClientsObject } from '../types/types.js';
import { TYPES } from '../types/enums.js';
import { updateRoom } from './update-room.js';

export function attachUserToRoom(data: string, wsServer: WebSocketServer, clients: ClientsObject, id: string) {
  const { indexRoom } = JSON.parse(data);
  const updatedUsersInRoom = database.updateRooms(indexRoom, id);
  database.deleteRoomWithTwoMembers();
  wsServer.clients.forEach((client) => client.send(updateRoom(id)));
  updatedUsersInRoom.forEach(({ name }) => {
    const [{ id, index }] = database.users.filter((user) => {
      if (name === user.name) {
        return user;
      }
    });
    clients[id].send(
      JSON.stringify({
        type: TYPES.createGame,
        data: JSON.stringify({
          idGame: indexRoom,
          idPlayer: index,
        }),
      }),
    );
  });
}
