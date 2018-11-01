'use strict';

const db = require(`../database/db`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`keksobookings`);
  //  collection.createIndex({name: -1}, {unique: true});
  return collection;
};
const defaultKeksobooking = {
  "author": {
    "name": ``,
    "avatar": ``
  },
  "offer": {
    "title": ``,
    "address": ``,
    "description": ``,
    "price": 0,
    "type": ``,
    "rooms": 0,
    "guests": 0,
    "checkin": ``,
    "checkout": ``,
    "features": []
  },
  "location": {
    "x": 0,
    "y": 0
  },
  "date": 0
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

  async save(objectData, avatar) {
    let object = Object.assign({}, defaultKeksobooking);
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

}

module.exports = new KeksobookingStore(setupCollection().
  catch((e) => console.error(`Failed to set up "wizards"-collection`, e)));
