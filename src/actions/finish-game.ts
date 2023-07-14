import { WebSocketServer } from 'ws';
import { TYPES } from '../types/enums.js';

export function finishGame(wsServer: WebSocketServer, currentPlayer: number) {
  wsServer.clients.forEach((client) =>
    client.send(
      JSON.stringify({
        type: TYPES.finish,
        data: JSON.stringify({
          winPlayer: currentPlayer,
        }),
        id: 0,
      }),
    ),
  );
}
