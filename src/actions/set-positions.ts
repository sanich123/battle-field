import { database } from '../database/database.js';
import { ClientsObject } from '../types/types.js';
import { TYPES } from '../types/enums.js';

export function setPositions(data: string, id: string, clients: ClientsObject) {
  const { gameId, ships, indexPlayer } = JSON.parse(data);

  console.log(`GameId=${gameId}`, ships, `indexPlayer=${indexPlayer}`);

  database.setPositions({ gameId, ships, indexPlayer, connectionId: id });
  if (database.getPositions().length === 2) {
    database.getPositions().forEach(({ indexPlayer, connectionId, ships }) => {
      clients[connectionId].send(
        JSON.stringify({
          type: TYPES.startGame,
          data: JSON.stringify({
            ships,
            currentPlayerIndex: indexPlayer,
          }),
          id: 0,
        }),
      );
    });
  }
}
