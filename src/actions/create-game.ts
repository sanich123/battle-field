import Server from 'ws';
import { TYPES } from '../types/enums.js';

export function createGame(ws: Server) {
  ws.send(
    JSON.stringify({
      type: TYPES.createGame,
      data: JSON.stringify({
        idGame: 1,
        idPlayer: 1,
      }),
    }),
  );
}
