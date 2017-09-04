'use strict';

const filter_data = require('../config/filter_data.json'),
  db = require('../database/mongodb'), //for single connection
  User = require('../database/models/User');

exports.up = function(next) {
  
  User.insertMany(filter_data.matches)
    .then(mongooseDocuments => next())
    .catch(err => console.log(err));
};

exports.down = function(next) {
  User.remove({})
    .then(mongooseDocuments => next())
    .catch(err => console.log(err));
};
