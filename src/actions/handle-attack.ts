import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { attackShip } from './attack-ship.js';
import { turnCourse } from './turn-course.js';
import { STATUSES_SHIP } from '../utils/const.js';
import { killAroundBoxes } from './kill-around-boxes.js';

export function handleAttack(frontendData: string, wsServer: WebSocketServer) {
  const { killed, shot } = STATUSES_SHIP;
  const { x, y, indexPlayer } = JSON.parse(frontendData);
  if (indexPlayer === database.getCurrentUser()) {
    if (!database.isCurrentUserShotedPositionsIncludesReceivedPositions(indexPlayer, x, y)) {
      database.getShotedPositions(indexPlayer).push({ x, y });
      const { ships: enemyShips, indexPlayer: enemyPlayer } = database.chooseEnemyPositions(indexPlayer);
      const indexOfShotedPositions = enemyShips.findIndex(({ allPositions }) =>
        allPositions.some((position) => position.x === x && position.y === y),
      );
      if (indexOfShotedPositions !== -1) {
        database.chooseEnemyPositions(indexPlayer).ships[indexOfShotedPositions].allPositions.map((position) => {
          if (position.x === x && position.y === y) {
            position.isShoted = true;
            return position;
          }
        });
        const positionShipWithStatuses =
          database.chooseEnemyPositions(indexPlayer).ships[indexOfShotedPositions].allPositions;
        const killOrInjured = positionShipWithStatuses.every(({ isShoted }) => isShoted) ? killed : shot;
        if (killOrInjured === killed) {
          killAroundBoxes(wsServer, indexPlayer, enemyPlayer, positionShipWithStatuses);
        } else {
          attackShip(wsServer, indexPlayer, frontendData, killOrInjured);
          turnCourse(wsServer, indexPlayer, `${enemyPlayer}`, killOrInjured);
        }
      } else {
        attackShip(wsServer, indexPlayer, frontendData);
        turnCourse(wsServer, indexPlayer, `${enemyPlayer}`);
      }
    }
  }
}
