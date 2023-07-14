import { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { updateWinners } from './update-winners.js';

export function setWinner(wsServer: WebSocketServer, indexPlayer: number) {
  const [{ name }] = database.getUsers().filter(({ index }) => index === indexPlayer);
  database.setWinner(name);
  updateWinners(wsServer);
}
