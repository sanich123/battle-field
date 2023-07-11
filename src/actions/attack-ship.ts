import { WebSocketServer } from 'ws';
import { TYPES } from '../types/enums.js';
import { STATUSES_SHIP } from '../utils/const.js';

export function attackShip(wsServer: WebSocketServer, currentPlayer: string, frontendData: string, status?: string) {
  const { x, y } = JSON.parse(frontendData);

  let objectToSend = {
    type: TYPES.attack,
    data: '',
    id: 0,
  };

  let rawData = {
    position: {
      x,
      y,
    },
    currentPlayer,
  };

  if (status) {
    objectToSend = {
      ...objectToSend,
      data: JSON.stringify({
        ...rawData,
        status,
      }),
    };
  } else {
    objectToSend = {
      ...objectToSend,
      data: JSON.stringify({
        ...rawData,
        status: STATUSES_SHIP.miss,
      }),
    };
  }
  wsServer.clients.forEach((client) => client.send(JSON.stringify(objectToSend)));
}
