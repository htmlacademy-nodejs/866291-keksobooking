'use strict';

const db = require(`../database/db`);
const logger = require(`../logger`);
const {DEFAULT_KEKSOBOOKING} = require(`../data/keksobooking`);
const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`keksobookings`);
  //  collection.createIndex({name: -1}, {unique: true});
  return collection;
};
class KeksobookingStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getObject(date) {
    return (await this.collection).findOne({"date": parseInt(date, 10)});
  }

  async getAllObject() {
    return (await this.collection).find();
  }

  async saveOffer(objectData, avatar) {
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
    return (await this.collection).insertOne(object);
  }

  async saveAll(data) {
    return (await this.collection).insertMany(data);
  }

}

module.exports = new KeksobookingStore(setupCollection().
  catch((e) => logger.error(`Failed to set up "keksobookings"-collection`, e)));
