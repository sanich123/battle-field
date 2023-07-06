type User = { name: string; password: string };

class DataBase {
  user: User;

  constructor() {
    this.user = {} as User;
  }

  setUser(regObject: User) {
    this.user = regObject;
  }

  getUser() {
    return this.user;
  }
}

export const database = new DataBase();