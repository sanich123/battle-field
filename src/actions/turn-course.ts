import { WebSocketServer } from 'ws';
import { TYPES } from '../types/enums.js';
import { database } from '../database/database.js';

export function turnCourse(wsServer: WebSocketServer, currentPlayer: number, nextPlayer: string, status?: string) {
  let objectToSend = { type: TYPES.turn, id: 0, data: '' };
  const player = status ? +currentPlayer : +nextPlayer;

  database.setCurrentUser(player);

  wsServer.clients.forEach((client) =>
    client.send(
      JSON.stringify({
        ...objectToSend,
        data: JSON.stringify({ currentPlayer: player }),
      }),
    ),
  );
}
