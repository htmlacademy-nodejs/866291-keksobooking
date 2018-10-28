'use strict';

const mongoose = require(`mongoose`);

const KeksobukingData = new mongoose.Schema({
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
    default: 0
  }
});

module.exports = mongoose.model(`KeksobukingData`, KeksobukingData);
