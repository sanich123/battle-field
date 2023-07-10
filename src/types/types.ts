import { WebSocket } from 'ws';

export type ClientsObject = {
  [key: string]: WebSocket;
};

export type User = {
  name: string;
  index: number;
  id: string;
  password: string;
};
export type ShipPosition = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  type: 'small' | 'medium' | 'large' | 'huge';
  length: number;
};

export type ShipPositions = {
  gameId: number;
  ships: ShipPosition[],
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
