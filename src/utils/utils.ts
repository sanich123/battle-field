import { IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';
import { v4 } from 'uuid';
import { ClientsObject } from '../types/types.js';
import Server from 'ws';
import { REG_EXP_PASSWORD } from './const.js';
import { database } from '../database/database.js';

export function parseReceivedData(receivedData: ArrayBuffer) {
  return JSON.parse(receivedData.toString());
}

export function getStatisticInfo(wsServer: WebSocketServer, req: IncomingMessage) {
  const {
    clients: { size },
  } = wsServer;
  const {
    socket: { remoteAddress },
  } = req;
  console.log(`Now we have ${size} connections. ${remoteAddress}`, wsServer.address());
}

export function setClientsWithIds(clients: ClientsObject, ws: Server) {
  const connectionId = v4();
  clients[connectionId] = ws;
  return { connectionId };
}

export function showIncomingInfo(type: string, data: ArrayBuffer, connectionId: string) {
  console.log(`Received type=${type}, data=${data.toString()}, connectionId=${connectionId}`);
}

export function validateLoginPassword(login: string, password: string) {
  const findedUser = database.getUsers().find(({ name }) => name === login);
  const invalidLogin = login.length < 2;
  const invalidPassword = !password.match(REG_EXP_PASSWORD);
  return { findedUser, invalidLogin, invalidPassword };
}

export function getStringifiedObject(type: string, data: Object) {
  return JSON.stringify({ type, data: JSON.stringify(data), id: 0 });
}
