import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { attackShip } from './attack-ship.js';
import { turnCourse } from './turn-course.js';

export function handleAttack(frontendData: string, wsServer: WebSocketServer) {
  const { x, y, gameId, indexPlayer } = JSON.parse(frontendData);
  const [{ ships: enemyShips, indexPlayer: enemyPlayer }] = database
    .getPositions()
    .filter(({ indexPlayer: userId }) => userId !== +indexPlayer);
  const isShot = enemyShips.find(({ position }) => position.x === x && position.y === y);

  if (isShot) {
    attackShip(wsServer, indexPlayer, frontendData, isShot);
    turnCourse(wsServer, indexPlayer, `${enemyPlayer}`, isShot);
  } else {
    attackShip(wsServer, indexPlayer, frontendData);
    turnCourse(wsServer, indexPlayer, `${enemyPlayer}`);
  }
  console.log(isShot);
  console.log(`x=${x}`, `y=${y}`, `gameId=${gameId}`, `indexPlayer=${indexPlayer}`);
}
