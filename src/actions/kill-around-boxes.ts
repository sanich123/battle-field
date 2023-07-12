import { WebSocketServer } from 'ws';
import { STATUSES_SHIP } from '../utils/const.js';
import { killAroundPositions } from '../utils/handle-positions.js';
import { AllPositions } from '../types/types.js';
import { TYPES } from '../types/enums.js';
import { turnCourse } from './turn-course.js';
import { database } from '../database/database.js';

export function killAroundBoxes(
  wsServer: WebSocketServer,
  indexPlayer: number,
  enemyPlayer: number,
  positionShipWithStatuses: AllPositions,
) {
  const { killed } = STATUSES_SHIP;
  const { attack } = TYPES;

  const allKilledArea = killAroundPositions(positionShipWithStatuses);

  allKilledArea.forEach(({ x, y }) => {
    database.getShotedPositions(indexPlayer).push({ x, y });
    const sendedObject = {
      type: attack,
      id: 0,
      data: JSON.stringify({
        status: killed,
        position: { x, y },
        currentPlayer: indexPlayer,
      }),
    };
    wsServer.clients.forEach((client) => client.send(JSON.stringify(sendedObject)));
  });
  turnCourse(wsServer, indexPlayer, `${enemyPlayer}`);
}
