import { IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';
import { v4 } from 'uuid';
import { ClientsObject } from '../types/types.js';
import Server from 'ws';

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
