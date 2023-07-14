import Server, { WebSocketServer } from 'ws';
import { database } from '../database/database.js';
import { TYPES } from '../types/enums.js';
import { updateRoom } from './update-room.js';
import { MESSAGES } from '../utils/const.js';
import { getStringifiedObject, validateLoginPassword } from '../utils/utils.js';
import { updateWinners } from './update-winners.js';

export function registrateUser(ws: Server, wsServer: WebSocketServer, data: string, id: string) {
  const { loginError, passwordError, findedUserError } = MESSAGES;
  const { name, password } = JSON.parse(data);
  const { findedUser, invalidLogin, invalidPassword } = validateLoginPassword(name, password);

  if (!findedUser && !invalidLogin && !invalidPassword) {
    database.setUser(name, id, password);
    const { name: userName, index, id: connectionId } = database.getNameAndIndex(id);
    ws.send(getStringifiedObject(TYPES.reg, { name: userName, index, error: false, errorText: '' }));
    console.log(`Sent user=${userName}, index=${index}, connection=${connectionId} to front-end`);
    wsServer.clients.forEach((client) => client.send(updateRoom(id)));
    updateWinners(wsServer);
  } else {
    let errorMessage;
    if (findedUser) errorMessage = findedUserError;
    else if (invalidLogin) errorMessage = loginError;
    else errorMessage = passwordError;
    ws.send(getStringifiedObject(TYPES.reg, { error: true, errorText: errorMessage }));
  }
}
