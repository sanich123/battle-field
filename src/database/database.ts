import { Rooms, ShipPositions, User } from '../types/types.js';

class DataBase {
  users: User[];
  rooms: Rooms[];
  shipPositions: ShipPositions[];
  userIndex: number;
  constructor() {
    this.users = [];
    this.shipPositions = [];
    this.userIndex = 0;
    this.rooms = [];
  }
  setPositions(positions: ShipPositions) {
    this.shipPositions.push(positions);
  }
  setUser(name: string, id: string, password: string) {
    this.users.push({ name, index: this.userIndex, id, password });
    this.userIndex += 1;
  }
  pushRoomToRooms(name: string, index: number) {
    this.rooms.push({ roomId: this.userIndex, roomUsers: [{ name, index }] });
  }
  getRooms() {
    return this.rooms;
  }
  updateRooms(indexRoom: number, userId: string) {
    const { index, name } = this.getNameAndIndex(userId);
    this.rooms.map((room) => {
      if (room.roomId === indexRoom) {
        room.roomUsers.push({ index, name });
      }
    });
    const [{ roomUsers }] = this.rooms.filter(({ roomId }) => roomId === indexRoom);
    return roomUsers;
  }
  deleteRoomWithTwoMembers() {
    this.rooms = this.rooms.filter(({ roomUsers }) => roomUsers.length < 2);
  }
  getPositions() {
    return this.shipPositions;
  }
  getNameAndIndex(userId: string) {
    const [{ index, name, id, password }] = this.users.filter(({ id }) => userId === id);
    return { index, name, id, password };
  }
  getUsers() {
    return this.users;
  }
  chooseEnemyPositions(currentPlayer: number) {
    return this.shipPositions.filter(({ indexPlayer }) => indexPlayer !== currentPlayer)[0];
  }
}

export const database = new DataBase();
