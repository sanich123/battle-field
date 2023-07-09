import { WebSocket } from 'ws';

export type ClientsObject = {
  [key: string]: WebSocket;
};

export type User = {
  name: string;
  index: number;
  id: string;
};

export type ShipPositions = {
  gameId: number;
  ships: [
    {
      position: {
        x: number;
        y: number;
      };
      direction: boolean;
      type: 'small' | 'medium' | 'large' | 'huge';
      length: number;
    },
  ];
  indexPlayer: number;
  connectionId: string;
};

export type Rooms = {
  roomId: number;
  roomUsers: [
    {
      name: string;
      index: number;
    },
  ];
};
