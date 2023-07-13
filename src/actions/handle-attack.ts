import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { attackShip } from './attack-ship.js';
import { turnCourse } from './turn-course.js';
import { STATUSES_SHIP } from '../utils/const.js';
import { killAroundBoxes } from './kill-around-boxes.js';
import {
  checkKilledOrInjured,
  findIndexOfShotedPositions,
  generateRandomPosition,
  isEverybodyKilled,
  setShotedToPositions,
} from '../utils/utils.js';
import { finishGame } from './finish-game.js';
import { setWinner } from './set-winner.js';

export function handleAttack(frontendData: string, wsServer: WebSocketServer) {
  let { x, y, indexPlayer } = JSON.parse(frontendData);
  if (indexPlayer === database.getCurrentUser()) {
    if (x === undefined || y === undefined) {
      const { x: randomX, y: randomY } = generateRandomPosition(database.getAllPossiblePositions(indexPlayer));
      x = randomX;
      y = randomY;
    }

    if (!database.isCurrentUserShotedPositionsIncludesReceivedPositions(indexPlayer, x, y)) {
      database.getShotedPositions(indexPlayer).push({ x, y });
      database.expelPositionFromAllPositions(indexPlayer, x, y);
    }

    const {
      ships: enemyShips,
      indexPlayer: enemyPlayer,
      shotedPositions,
      allPossiblePositions,
    } = database.chooseEnemyPositions(indexPlayer);
    console.log(allPossiblePositions);
    const indexOfShotedPositions = findIndexOfShotedPositions(enemyShips, x, y);
    if (indexOfShotedPositions !== -1) {
      setShotedToPositions(enemyShips, indexOfShotedPositions, x, y);
      const { allPositions } = enemyShips[indexOfShotedPositions];
      const killOrInjured = checkKilledOrInjured(allPositions);
      if (killOrInjured === STATUSES_SHIP.killed) {
        killAroundBoxes(wsServer, indexPlayer, enemyPlayer, allPositions);
      } else {
        attackShip(wsServer, indexPlayer, { x, y }, killOrInjured);
        turnCourse(wsServer, indexPlayer, `${enemyPlayer}`, killOrInjured);
      }
      if (isEverybodyKilled(enemyShips)) {
        finishGame(wsServer, indexPlayer);
        setWinner(wsServer, indexPlayer);
      }
    } else {
      attackShip(wsServer, indexPlayer, { x, y });
      turnCourse(wsServer, indexPlayer, `${enemyPlayer}`);
    }
  }
}
