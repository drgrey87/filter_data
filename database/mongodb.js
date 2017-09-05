'use strict';

const Mongoose = require('mongoose'),
  config = require('../config/config'),
  connection_string = `mongodb://${config.mongodb.ip}:${config.mongodb.port}/${config.mongodb.database}`;

Mongoose.connect(connection_string).then(
  () => console.log(`mongoose was connected on ${connection_string}`),
  err => console.log('err', err)
);

module.exports = Mongoose;