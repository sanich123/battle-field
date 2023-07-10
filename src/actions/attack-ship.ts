import { WebSocketServer } from 'ws';
import { ShipPosition } from '../types/types.js';
import { TYPES } from '../types/enums.js';

export function attackShip(
  wsServer: WebSocketServer,
  currentPlayer: string,
  frontendData: string,
  isShot?: ShipPosition,
) {
  let objectToSend = { type: TYPES.attack, id: 0, data: '' };
  const { x, y } = JSON.parse(frontendData);
  if (isShot) {
    const { position } = isShot;
    objectToSend = {
      ...objectToSend,
      data: JSON.stringify({
        position,
        currentPlayer,
        status: 'shot',
      }),
    };
  } else {
    objectToSend = {
      ...objectToSend,
      data: JSON.stringify({
        position: { x, y },
        currentPlayer,
        status: 'miss',
      }),
    };
  }
  wsServer.clients.forEach((client) => client.send(JSON.stringify(objectToSend)));
}
