import Server from 'ws';
import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';

export function registrateUser(ws: Server, data: string) {
  console.log(`Received registration request.`);

  const { name, password } = JSON.parse(data);
  database.setUser({ name, password });
  console.log(`Received data ${name} ${password} successfully saved in the database`);
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
  console.log(`Sent ${database.getUser().name} to front-end`);
}
