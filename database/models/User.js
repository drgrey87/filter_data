'use strict';

const Mongoose = require('mongoose'),
  get_distance = require('../../helpers'),
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

User_schema.statics.findBy = function(data, user) {
  let query_chain = this.find()
    .exists('main_photo', data.main_photo.value);

  if (data.contacts_exchanged.value) {
    query_chain
      .where('contacts_exchanged').gt(0);
  } else {
    query_chain
      .where('contacts_exchanged', 0);
  }

  return query_chain
    .where('favourite', data.favourite.value)
    .where('compatibility_score').gte(data.compatibility_score.from/data.compatibility_score.divider).lte(data.compatibility_score.to/data.compatibility_score.divider)
    .where('age').gte(data.age.from).lte(data.age.to)
    .where('height_in_cm').gte(data.height_in_cm.from).lte(data.height_in_cm.to)
    .where('_id').ne(user._id)
    .lean()
    .then(result => result.filter(item => get_distance(user.city.lat, user.city.lon, item.city.lat, item.city.lon) >= data.distance.value));
};

const User = Mongoose.model('User', User_schema);

module.exports = User;
