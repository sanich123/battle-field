import { WebSocketServer } from 'ws';
import { TYPES } from '../types/enums.js';

export function turnCourse(wsServer: WebSocketServer, currentPlayer: number, nextPlayer: string, status?: string) {
  let objectToSend = { type: TYPES.turn, id: 0, data: '' };
  wsServer.clients.forEach((client) =>
    client.send(
      JSON.stringify({
        ...objectToSend,
        data: JSON.stringify({ currentPlayer: status ? +currentPlayer : +nextPlayer }),
      }),
    ),
  );
}
