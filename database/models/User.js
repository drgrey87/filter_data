'use strict';

const Mongoose = require('mongoose'),
  //The document structure definition
  Schema = Mongoose.Schema,
  User = new Schema({
    display_name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    job_title: {
      type: String,
      required: true
    },
    height_in_cm:{
      type: Number,
      required: true
    },
    city: {
      name: {
        type: String,
        required: true
      },
      lat: {
        type: Number,
        required: true
      },
      lon: {
        type: Number,
        required: true
      },
    },
    main_photo: {
      type: String,
      required: true
    },
    compatibility_score: {
      type: Number,
      required: true
    },
    contacts_exchanged: {
      type: Number,
      required: true
    },
    favourite: {
      type: Boolean,
      required: true
    },
    religion: {
      type: String,
      required: true
    }
  });

User.statics.findBy = function(data) {
  return this.find(data).exec();
};

const User = Mongoose.model('User', User);

module.exports = User;
