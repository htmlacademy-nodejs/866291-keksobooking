'use strict';

const mongoose = require(`mongoose`);

const Offer = new mongoose.Schema({
  name: {
    type: String,
    default: ``
  },
  title: {
    type: String,
    default: ``
  },
  address: {
    type: String,
    default: ``
  },
  description: {
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
  avatar: {
    type: String,
    default: ``
  },
  preview: {
    type: String,
    default: ``
  }
});

module.exports = mongoose.model(`Offer`, Offer);
