type User = { name: string; password: string };
type ShipPositions = {
  gameId: number;
  ships: [
    {
      position: {
        x: number;
        y: number;
      },
      direction: boolean,
      type: "small" | "medium" | "large" | "huge",
      length: number,
    },
  ];
};

class DataBase {
  user: User;
  shipPositions: ShipPositions[];
  constructor() {
    this.user = {} as User;
    this.shipPositions = [] as ShipPositions[];
  }
  setPosition(positions: ShipPositions) {
    this.shipPositions.push(positions);
  }
  setUser(regObject: User) {
    this.user = regObject;
  }
  getPositionsLength() {
    return this.shipPositions.length;
  }
  getUser() {
    return this.user;
  }
}

export const database = new DataBase();
