import { database } from '../database/database.js';

export function addPositions(receivedData: ArrayBuffer) {
  const { data } = JSON.parse(receivedData.toString());
  const { ships } = JSON.parse(data);
  database.setPosition(ships);
}
