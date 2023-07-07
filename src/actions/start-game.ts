import Server from 'ws';
import { TYPES } from '../types/enums.js';

export function startGame(ws: Server) {
  ws.send(
    JSON.stringify({
      type: TYPES.startGame,
      data: JSON.stringify({
        ships: [
          JSON.stringify({
            position: {
              x: 1,
              y: 3,
            },
            direction: false,
            length: 4,
            type: 'large',
          }),
        ],
        currentPlayerIndex: 1,
      }),
    }),
  );
}
