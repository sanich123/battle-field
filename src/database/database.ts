import { Rooms, ShipPositions, User } from '../types/types.js';

class DataBase {
  users: User[];
  rooms: Rooms[];
  shipPositions: ShipPositions[];
  userIndex: number;
  currentUser: number | undefined;
  winners: { name: string; wins: number }[];
  constructor() {
    this.users = [];
    this.shipPositions = [];
    this.userIndex = 0;
    this.rooms = [];
    this.currentUser = undefined;
    this.winners = [];
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
  isCurrentUserShotedPositionsIncludesReceivedPositions(currentPlayer: number, x: number, y: number) {
    return this.getShotedPositions(currentPlayer).find((position) => position.x === x && position.y === y);
  }
  getShotedPositions(currentPlayer: number) {
    return this.shipPositions.filter(({ indexPlayer }) => indexPlayer !== currentPlayer)[0].shotedPositions;
  }
  setCurrentUser(value: number) {
    this.currentUser = value;
  }
  getCurrentUser() {
    return this.currentUser;
  }
  checkWinnerIsExist(username: string) {
    return this.winners.find(({ name }) => name === username);
  }
  setWinner(username: string) {
    if (!this.checkWinnerIsExist(username)) {
      this.winners.push({ name: username, wins: 1 });
    } else {
      this.winners.map((winner) => {
        if (winner.name === username) {
          winner.wins += 1;
          return winner;
        }
      });
    }
  }
  getWinners() {
    return this.winners;
  }
}

export const database = new DataBase();
