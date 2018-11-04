'use strict';

const db = require(`../database/db`);
const logger = require(`../logger`);
const {DEFAULT_KEKSOBOOKING, DB_NAME} = require(`../data/constants`);
const setupCollection = async () => {
  let dBase = await db;
  let collection = await dBase.collection(DB_NAME.OFFER);
  collection.createIndex({date: -1}, {unique: true});

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

    return (await this.collection).insertOne(object);
  }

  async saveAll(data) {
    return (await this.collection).insertMany(data);
  }

}

module.exports = new KeksobookingStore(setupCollection().
catch((e) => logger.error(`Failed to set up "${DB_NAME.OFFER}"-collection`, e)));
