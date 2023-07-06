import { WebSocketServer } from "ws";
import { SOME_CONST } from "./some-module/some-module.js";

const websocketServer = new WebSocketServer({ port: 3000 });

websocketServer.on("connection", function connection(ws) {
  console.log(SOME_CONST(), 'The server is started!');
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
