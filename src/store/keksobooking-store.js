'use strict';

const dbConnections = require(`../database/singelton`);
const logger = require(`../logger`);
const {DEFAULT_KEKSOBOOKING} = require(`../data/constants`);
const setupCollection = async () => {
  try {
    let db = await dbConnections.get();
    let result = await db.collection(`keksobookings`);

    return result;
  } catch (e) {
    return e;
  }
};
class KeksobookingStore {
  constructor(collection) {
    this.collection = collection ? collection : setupCollection().
      catch((e) => logger.error(`Failed to set up "keksobookings"-collection`, e));
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

module.exports = new KeksobookingStore();
