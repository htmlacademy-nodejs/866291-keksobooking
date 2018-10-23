'use strict';

const assert = require(`assert`);
const path = require(`path`);

const generateCommand = require(`../src/commands/generate`);
const {OFFER, LOCATION} = require(`../src/data/keksobooking`);


const COMMAND = ``;
const QUANTITY_OBJECT = 2;
const IS_TEST = true;

class KeksobokingData {
  constructor(obejct) {
    this.author = obejct.author;
    this.offer = obejct.offer;
    this.location = obejct.location;
    this.date = obejct.date;
  }
  checkValue() {
    describe(`Check KeksobokingData`, () => {
      it(`Check author.avatar`, () => {
        return assert.equal(typeof this.author.avatar, `string`, this.author.avatar);
      });
      it(`Check offer.title`, () => {
        return assert(OFFER.TITLE.indexOf(this.offer.title) !== -1, this.offer.title);
      });
      it(`Check offer.addres`, () => {
        return assert.equal(this.offer.addres, `${this.location.x}, ${this.location.y}`, this.offer.addres);
      });
      it(`Check offer.price`, () => {
        return assert(this.offer.price <= OFFER.MAX_PRICE && this.offer.price >= OFFER.MIN_PRICE, this.offer.price);
      });
      it(`Check offer.type`, () => {
        return assert(OFFER.TYPE.indexOf(this.offer.type) !== -1, this.offer.type);
      });
      it(`Check offer.rooms`, () => {
        return assert(this.offer.rooms <= OFFER.MAX_ROOMS && this.offer.rooms >= OFFER.MIN_ROOMS, this.offer.rooms);
      });
      it(`Check offer.guests`, () => {
        return assert(this.offer.guests <= OFFER.MAX_GUESTS && this.offer.guests >= OFFER.MIN_GUESTS, this.offer.rooms);
      });
      it(`Check offer.checkin`, () => {
        return assert(OFFER.CHECKIN.indexOf(this.offer.checkin) !== -1, this.offer.checkin);
      });
      it(`Check offer.checkout`, () => {
        return assert(OFFER.CHECKOUT.indexOf(this.offer.checkout) !== -1, this.offer.checkout);
      });
      it(`Check offer.features`, () => {
        return assert(this.offer.features !== undefined, this.offer.features);
      });
      it(`Check offer.description`, () => {
        return assert(this.offer.description === OFFER.DESCRIPTION, this.offer.description);
      });
      it(`Check offer.photos`, () => {
        return assert(this.offer.photos !== undefined, this.offer.photos);
      });
      it(`Check location.x`, () => {
        return assert(this.location.x <= LOCATION.MAX_X && this.location.x >= LOCATION.MIN_X, this.location.x);
      });
      it(`Check location.y`, () => {
        return assert(this.location.y <= LOCATION.MAX_Y && this.location.y >= LOCATION.MIN_Y, this.location.y);
      });
      it(`Check date`, () => {
        return assert(this.date !== undefined, this.date);
      });
    });
  }
}

describe(`Generate JSON command`, () => {
  it(`should fail on non existing folder`, () => {
    const tempFileName = path.resolve(`test`, `json`, `testfile.json`);

    return generateCommand.execute(COMMAND, QUANTITY_OBJECT, tempFileName, IS_TEST)
      .then(() => assert.fail(`Path ${tempFileName} should not be available`))
      .catch((e) => assert.ok(e));
  });
  it(`Check JSON file`, () => {
    const tempFileName = path.resolve(`test`, `json`, `testfile.json`);

    let testJSON = require(tempFileName);
    for (let item of testJSON) {
      let testObject = new KeksobokingData(item);
      testObject.checkValue();
    }
  });
});
