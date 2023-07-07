import Server from 'ws';
import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';

export function registrateUser(ws: Server) {
  const { name } = database.getUser();
  const stringifiedObject = JSON.stringify({
    type: TYPES.reg,
    data: JSON.stringify({
      name,
      index: 0,
      error: false,
      errorText: 'Some error',
    }),
    id: 0,
  });
  ws.send(stringifiedObject);
}
