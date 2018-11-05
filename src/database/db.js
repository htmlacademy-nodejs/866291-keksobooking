'use strict';
const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {
  DB_HOST = `localhost`,
  DB_PORT = 27017,
  DB_NAME = `code-and-magick`
} = process.env;

const url = `mongodb://${DB_HOST}:${DB_PORT}`;

class DataBase {
  constructor(urlText, dbName) {
    this.url = urlText;
    this.url = dbName;
  }

  async get() {
    if (this._db) {
      return this._db;
    }
    if (!this._db) {
      await MongoClient.connect(url, {useNewUrlParser: true})
        .then((client) => {
          this._connect = client;
          this._db = client.db(DB_NAME);
          console.info(`MongoDB connected`);
        })
        .catch((e) => {
          logger.error(`Failed to connect to MongoDB`, e);
          process.exit(1);
        });
    }
    return this._db;
  }
  async stop() {
    if (this._connect) {
      this._connect.close()
        .then(() => {
          console.info(`MongoDB close connect`);
        })
        .catch((e) => {
          logger.error(`Failed to close connect to MongoDB`, e);
          process.exit(1);
        });
    }
  }
}

module.exports = new DataBase(url, DB_NAME);
