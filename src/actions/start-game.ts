import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';

export function startGame() {
  console.log(database.shipPositions)
  return JSON.stringify({
    type: TYPES.startGame,
    data: JSON.stringify({
      ships: database.shipPositions,
      currentPlayerIndex: 1,
    }),
  });
}
