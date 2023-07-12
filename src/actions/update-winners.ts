import { WebSocketServer } from 'ws';
import { TYPES } from '../types/enums.js';
import { database } from '../database/database.js';

export function updateWinners(wsServer: WebSocketServer) {
  wsServer.clients.forEach((client) =>
    client.send(
      JSON.stringify({
        type: TYPES.updateWinners,
        data: JSON.stringify(database.getWinners()),
        id: 0,
      }),
    ),
  );
}
