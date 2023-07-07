import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { startGame } from './start-game.js';

export function setPositions(data: string, wsServer: WebSocketServer) {
  const { ships } = JSON.parse(data);
  database.setPosition(ships);
  if (database.getPositionsLength() >= 2) {
    wsServer.clients.forEach((client) => client.send(startGame()));
  }
}
