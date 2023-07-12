import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { attackShip } from './attack-ship.js';
import { turnCourse } from './turn-course.js';
import { STATUSES_SHIP } from '../utils/const.js';
import { killAroundBoxes } from './kill-around-boxes.js';
import {
  checkKilledOrInjured,
  findIndexOfShotedPositions,
  isEverybodyKilled,
  setShotedToPositions,
} from '../utils/utils.js';
import { finishGame } from './finish-game.js';
import { setWinner } from './set-winner.js';

export function handleAttack(frontendData: string, wsServer: WebSocketServer) {
  const { x, y, indexPlayer } = JSON.parse(frontendData);
  if (indexPlayer === database.getCurrentUser()) {
    if (!database.isCurrentUserShotedPositionsIncludesReceivedPositions(indexPlayer, x, y)) {
      database.getShotedPositions(indexPlayer).push({ x, y });
      const { ships: enemyShips, indexPlayer: enemyPlayer } = database.chooseEnemyPositions(indexPlayer);
      const indexOfShotedPositions = findIndexOfShotedPositions(enemyShips, x, y);
      if (indexOfShotedPositions !== -1) {
        setShotedToPositions(enemyShips, indexOfShotedPositions, x, y);
        const { allPositions } = enemyShips[indexOfShotedPositions];
        const killOrInjured = checkKilledOrInjured(allPositions);
        if (killOrInjured === STATUSES_SHIP.killed) {
          killAroundBoxes(wsServer, indexPlayer, enemyPlayer, allPositions);
        } else {
          attackShip(wsServer, indexPlayer, frontendData, killOrInjured);
          turnCourse(wsServer, indexPlayer, `${enemyPlayer}`, killOrInjured);
        }
        if (isEverybodyKilled(enemyShips)) {
          finishGame(wsServer, indexPlayer);
          setWinner(wsServer, indexPlayer);
        }
      } else {
        attackShip(wsServer, indexPlayer, frontendData);
        turnCourse(wsServer, indexPlayer, `${enemyPlayer}`);
      }
    }
  }
}
