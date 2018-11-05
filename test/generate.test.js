'use strict';

const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const fsaccess = promisify(fs.access);
const fsunlink = promisify(fs.unlink);
const path = require(`path`);

const generateCommand = require(`./generate/generate`);
const {OFFER, LOCATION} = require(`../src/data/constants`);

const QUANTITY_OBJECT = 5;

class KeksobokingData {
  constructor(obejct) {
    this.author = obejct.author;
    this.offer = obejct.offer;
    this.location = obejct.location;
    this.date = obejct.date;
  }
  checkValue(index = 0) {
    it(`Check data [${index}]`, () => {
      assert.equal(typeof this.author.avatar, `string`, this.author.avatar);
      assert(OFFER.TITLE.indexOf(this.offer.title) !== -1, this.offer.title);
      assert.equal(this.offer.address, `${this.location.x}, ${this.location.y}`, this.offer.address);
      assert(this.offer.price <= OFFER.MAX_PRICE && this.offer.price >= OFFER.MIN_PRICE, this.offer.price);
      assert(OFFER.TYPE.indexOf(this.offer.type) !== -1, this.offer.type);
      assert(this.offer.rooms <= OFFER.MAX_ROOMS && this.offer.rooms >= OFFER.MIN_ROOMS, this.offer.rooms);
      assert(this.offer.guests <= OFFER.MAX_GUESTS && this.offer.guests >= OFFER.MIN_GUESTS, this.offer.rooms);
      assert(OFFER.CHECKIN.indexOf(this.offer.checkin) !== -1, this.offer.checkin);
      assert(OFFER.CHECKOUT.indexOf(this.offer.checkout) !== -1, this.offer.checkout);
      assert(this.offer.features !== undefined, this.offer.features);
      assert(this.offer.description === OFFER.DESCRIPTION, this.offer.description);
      assert(this.offer.photos !== undefined, this.offer.photos);
      assert(this.location.x <= LOCATION.MAX_X && this.location.x >= LOCATION.MIN_X, this.location.x);
      assert(this.location.y <= LOCATION.MAX_Y && this.location.y >= LOCATION.MIN_Y, this.location.y);
      assert(this.date !== undefined, this.date);
    });
  }
}

describe(`Generate JSON command`, () => {
  it(`Should create a new file in "tmp" catalogue of project root`, () => {
    const tempFileName = path.resolve(`test`, `json`, `testfile.json`);
    return generateCommand.execute(0, tempFileName)
      .then(fsaccess(tempFileName))
      .then(fsunlink(tempFileName))
      .catch((err) => assert.fail(err.message));
  });

  it(`should fail on non existing folder.`, () => {
    const tempFileName = path.resolve(`test`, `json-test`, `testfile.json`);
    return generateCommand.execute(0, tempFileName)
      .then(() => assert.fail(`The "${tempFileName}" path must be inaccessible!`))
      .catch((err) => assert.ok(err));
  });

  it(`Create test file.`, () => {
    const tempFileName = path.resolve(`test`, `json`, `testfile.json`);
    return generateCommand.execute(QUANTITY_OBJECT, tempFileName)
      .then(() => assert.ok(`File create!`))
      .catch((err) => assert.fail(err));
  });
  it(`Check JSON file`, () => {
    const tempFileName = path.resolve(`test`, `json`, `testfile.json`);

    const testJSON = require(tempFileName);
    let index = 0;
    describe(`Check KeksobokingData`, () => {
      for (const item of testJSON) {
        const testObject = new KeksobokingData(item);
        testObject.checkValue(index);
        index++;
      }
    });
  });
});
