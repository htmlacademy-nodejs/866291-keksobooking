'use strict';

const MongoClient = require(`mongodb`).MongoClient;
const logger = require(`../logger`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `code-and-magick`
} = process.env;

const url = `mongodb://${DB_HOST}`;
class Db {
  constructor() {
    this.db = null;
    this.instance = 0;
  }
  async _dbConnect() {
    try {
      let _db = await MongoClient.connect(url, {useNewUrlParser: true})
        .then((client) => client.db(DB_PATH))
        .catch((e) => {
          logger.error(`Failed to connect to MongoDB`, e);
          process.exit(1);
        });

      return _db;
    } catch (e) {
      return e;
    }
  }

  async get() {
    try {
      this.instance++;
      console.log(`DbConnection called ${this.instance} times`);

      if (this.db !== null) {
        console.log(`db connection is already alive`);
        return this.db;
      } else {
        console.log(`getting new db connection`);
        this.db = await this._dbConnect();
        return this.db;
      }
    } catch (e) {
      return e;
    }
  }
}


module.exports = new Db();
