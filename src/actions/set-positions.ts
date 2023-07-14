import { database } from '../database/database.js';
import { ClientsObject } from '../types/types.js';
import { TYPES } from '../types/enums.js';
import { WebSocketServer } from 'ws';
import { turnCourse } from './turn-course.js';
import { getStringifiedObject } from '../utils/utils.js';
import { addFullPositions, generateAllPossiblePositions } from '../utils/handle-positions.js';

export function setPositions(
  data: string,
  id: string,
  clients: ClientsObject,
  wsServer: WebSocketServer,
) {
  const { startGame } = TYPES;
  const { gameId, ships, indexPlayer } = JSON.parse(data);
  addFullPositions(ships);

  database.setPositions({ gameId, ships, indexPlayer, connectionId: id, shotedPositions: [], allPossiblePositions: generateAllPossiblePositions() });
  if (database.getPositions().length === 2) {
    database.getPositions().forEach(({ indexPlayer, connectionId, ships }) => {
      clients[connectionId].send(getStringifiedObject(startGame, { ships, currentPlayerIndex: indexPlayer }));
    });
    const firstPlayer = database.getPositions()[0];
    const { indexPlayer } = firstPlayer;
    turnCourse(wsServer, indexPlayer, '');
  }
}
