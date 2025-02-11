export type DB = {
  [uuid: string]: string;
};

class DBClass {
  private static instance: DBClass;
  private db: DB[] = [];

  private constructor() {
    this.db = [];
  }

  public static getInstance(): DBClass {
    if (!DBClass.instance) {
      DBClass.instance = new DBClass();
    }
    return DBClass.instance;
  }

  clear() {
    this.db = [];
    console.log(this.db);
  }

  find(uuid: string) {
    return this.db.find((item) => item[uuid])?.[uuid] as string;
  }

  add(uuid: string, message: string) {
    this.db.push({ [uuid]: message });
    return this.db[this.db.length - 1][uuid] as string;
  }
}

const db = DBClass.getInstance();

export default db;
