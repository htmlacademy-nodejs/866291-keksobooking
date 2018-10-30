'use strict';

const mongoose = require(`mongoose`);
const {VALID} = require(`../data/keksobooking`);
const {takeArrayElement} = require(`../data/randomValue`);
const toStream = require(`buffer-to-stream`);
const imgStore = require(`../images/store`);

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
    addres: {
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

KeksobookingSchema.methods.addOffer = async function (offer, avatar, res, next) {
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
    await imgStore.save(avatar.originalname, toStream(avatar.buffer));
  }
  await this.save()
    .then(() => res.json(offer))
    .catch((err) => next(err));
  return Object.assign(this.offer, this.location);
};
module.exports = mongoose.model(`keksobooking`, KeksobookingSchema);
