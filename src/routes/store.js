'use strict';

const db = require(`../database/db`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`keksobooking`);
  collection.createIndex({name: -1}, {unique: true});
  return collection;
};

class KeksobookingStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getObject(name) {
    return (await this.collection).findOne({name});
  }

  async getAllObject() {
    return (await this.collection).find();
  }

  async save(wizardData) {
    return (await this.collection).insertOne(wizardData);
  }

}

module.exports = new KeksobookingStore(setupCollection().
  catch((e) => console.error(`Failed to set up "wizards"-collection`, e)));
