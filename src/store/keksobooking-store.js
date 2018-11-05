'use strict';

const db = require(`../database/db`);
const {DEFAULT_KEKSOBOOKING, DB_NAME} = require(`../data/constants`);
const logger = require(`../logger`);
class KeksobookingStore {
  constructor(bdName) {
    this.bdName = bdName;
  }

  async getСollection() {
    if (this._collection) {
      return this._collection;
    }
    if (!this._collection) {
      let dBase = await db.get()
        .then((dataBase) => {
          logger.info(`Collection "${this.bdName}" connected`);
          return dataBase;
        })
        .catch((e) => logger.error(`Failed to connect "${this.bdName}"`, e));
      this._collection = await dBase.collection(this.bdName);
      this._collection.createIndex({date: -1}, {unique: true});
    }
    return this._collection;
  }

  async getObject(date) {
    const collection = await this.getСollection();
    return collection.findOne({"date": parseInt(date, 10)});
  }

  async getAllObject() {
    const collection = await this.getСollection();
    return collection.find();
  }

  async saveOffer(objectData, avatar, photos) {

    let object = Object.assign({}, DEFAULT_KEKSOBOOKING);
    Object.assign(object.offer, objectData);
    Object.assign(object.location, objectData.location);
    Object.assign(object.author, {"name": objectData.name});
    delete object.offer.name;
    delete object.offer.location;
    object.date = Date.now();

    if (avatar) {
      object.author.avatar = `api/offers/${object.date}/avatar`;
    }

    for (let i = 0; i < photos.length; i++) {
      object.offer.photos[i] = `api/offers/${object.date}/photos/${i}`;
    }

    const collection = await this.getСollection();
    return collection.insertOne(object);
  }

  async saveAll(data) {
    const collection = await this.getСollection();
    return collection.insertMany(data);
  }

}

module.exports = new KeksobookingStore(DB_NAME.OFFER);
