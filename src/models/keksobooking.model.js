'use strict';

const mongoose = require(`mongoose`);
const {VALID} = require(`../data/keksobooking`);
const {takeArrayElement} = require(`../data/randomValue`);
const toStream = require(`buffer-to-stream`);
const imgStore = require(`../images/store`);
const ValidationError = require(`../error/validation-error`);
const NotFoundError = require(`../error/not-found-error`);

const KeksobookingSchema = new mongoose.Schema({
  author: {
    name: {
      type: String,
      default: ``
    },
    avatar: {
      type: String,
      default: ``
    }
  },
  offer: {
    title: {
      type: String,
      default: ``
    },
    description: {
      type: String,
      default: ``
    },
    address: {
      type: String,
      default: ``
    },
    price: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ``
    },
    rooms: {
      type: Number,
      default: 0
    },
    guests: {
      type: Number,
      default: 0
    },
    checkin: {
      type: String,
      default: ``
    },
    checkout: {
      type: String,
      default: ``
    },
    features: [{
      type: String,
      default: ``
    }],
    photos: [{
      type: String,
      default: ``
    }]
  },
  location: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  date: {
    type: Number,
    default: Date.now()
  }
});

KeksobookingSchema.methods.addOffer = async function (offer, avatar) {
  this.offer = offer;
  const address = offer.address.split(`, `);
  if (offer.name.length !== ``) {
    this.author.name = offer.name;
  } else {
    this.author.name = takeArrayElement(VALID.NAME);
  }
  this.date = Date.now();
  this.location = {
    "x": parseInt(address[0], 10),
    "y": parseInt(address[1], 10)
  };
  if (avatar) {
    this.author.avatar = `api/offers/${this.date}/avatar`;
    await imgStore.save(this._id, toStream(avatar.buffer)).catch((err) => {
      throw new ValidationError(err);
    });
  }
  await this.save()
    .catch((err) => {
      throw new ValidationError(err);
    });
  const data = Object.assign({}, this.offer, {location: {x: this.location.x, y: this.location.y}}, {name: this.author.name});
  return data;
};
KeksobookingSchema.methods.getImage = async function () {
  return await imgStore.get(this._id).then((stream) => {
    return stream;
  })
    .catch(() => {
      throw new NotFoundError(`Аватар для "${this.author.name}" не найден`);
    });
};

module.exports = mongoose.model(`keksobooking`, KeksobookingSchema);
