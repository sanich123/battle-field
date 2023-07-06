import { WebSocketServer } from 'ws';

export const websocketServer = new WebSocketServer({ port: 3000 });

websocketServer.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});
