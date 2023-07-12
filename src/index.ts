import Server, { WebSocketServer } from 'ws';
import { getStatisticInfo, parseReceivedData, setClientsWithIds, showIncomingInfo } from './utils/utils.js';
import { IncomingMessage } from 'http';
import { ClientsObject } from './types/types.js';
import { router } from './router/router.js';

const wsServer = new WebSocketServer({ port: 3000 });
const clients: ClientsObject = {};

wsServer.on('connection', (ws: Server, req: IncomingMessage) => {

  getStatisticInfo(wsServer, req);
  const { connectionId } = setClientsWithIds(clients, ws);

  ws.on('message', (receivedData: ArrayBuffer) => {
    const { type, data } = parseReceivedData(receivedData);
    showIncomingInfo(type, data, connectionId);
    router(type, data, connectionId, ws, wsServer, clients);
  });
  ws.on('error', (err) => console.log(err.message));
  ws.on('close', () => console.log('WebSocket was closed'));
});
