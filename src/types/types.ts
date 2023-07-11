import { WebSocket } from 'ws';
import { ShipTypes } from './enums.js';

export type ClientsObject = {
  [key: string]: WebSocket;
};

export type User = {
  name: string;
  index: number;
  id: string;
  password: string;
};

export type AllPositions = {
  x: number;
  y: number;
  isShoted: boolean;
  placed: 'horizontal' | 'vertical' | 'none';
}[];

export type ShipPosition = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  type: ShipTypes;
  length: number;
  isShot: boolean;
  allPositions: AllPositions;
};

export type ShipPositions = {
  gameId: number;
  ships: ShipPosition[];

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
