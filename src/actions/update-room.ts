import { TYPES } from '../types/enums.js';
import { database } from '../database/database.js';

export function updateRoom(id: string) {
  const { index, name } = database.getNameAndIndex(id);
  console.log(`Current user ${name}, with index ${index}`);
  console.log(database.getRooms());
  const stringifiedData = JSON.stringify({
    type: TYPES.updateRoom,
    data: JSON.stringify(database.getRooms()),
  });
  console.log(`Update room with data ${stringifiedData} sended to frontend`);
  return stringifiedData;
}
