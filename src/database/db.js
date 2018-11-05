'use strict';
const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {
  DB_HOST = `localhost`,
  DB_PORT = 27017,
  DB_NAME = `code-and-magick`
} = process.env;

const url = `mongodb://${DB_HOST}:${DB_PORT}`;


const initDb = async () => {
  let client;
  let db;
  try {
    client = await MongoClient.connect(url, {useNewUrlParser: true});
    db = client.db(DB_NAME);
  } catch (err) {
    logger.error(`Failed to connect to MongoDB`, err);
    process.exit(1);
  }

  return db;
};

module.exports = initDb;
