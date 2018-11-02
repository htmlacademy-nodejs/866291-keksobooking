'use strict';

const MongoClient = require(`mongodb`).MongoClient;
const url = `mongodb://localhost:27017`;
const dbName = `code-and-magick`;
const logger = require(`../logger`);

let dbConnection = function () {

  let db = null;
  let instance = 0;

  async function dbConnect() {
    try {
      let _db = await MongoClient.connect(url, {useNewUrlParser: true}).then((client) => client.db(dbName)).catch((e) => {
        logger.error(`Failed to connect to MongoDB`, e);
        process.exit(1);
      });

      return _db;
    } catch (e) {
      return e;
    }
  }

  async function get() {
    try {
      instance++;
      logger.info(`DbConnection called ${instance} times`);

      if (db !== null) {
        logger.info(`db connection is already alive`);
        return db;
      } else {
        logger.info(`getting new db connection`);
        db = await dbConnect();
        return db;
      }
    } catch (e) {
      return e;
    }
  }

  return {
    "get": get
  };
};


module.exports = dbConnection();
