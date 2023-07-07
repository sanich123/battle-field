import Server from 'ws';
import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';

export function createRoom(ws: Server) {
  const { name } = database.getUser();
  ws.send(
    JSON.stringify({
      type: TYPES.updateRoom,
      data: JSON.stringify([
        {
          roomId: 1,
          roomUsers: [
            {
              name,
              index: 0,
            },
          ],
        },
      ]),
      id: 0,
    }),
  );
}
