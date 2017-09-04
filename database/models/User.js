'use strict';

const Mongoose = require('mongoose'),
  //The document structure definition
  Schema = Mongoose.Schema,
  User_schema = new Schema({
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
      type: String
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

User_schema.statics.findBy = function(data) {
  return this.find(data).lean();
};

const User = Mongoose.model('User', User_schema);

module.exports = User;
