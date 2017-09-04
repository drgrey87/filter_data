'use strict';

const Mongoose = require('mongoose'),
  config = require('../config/config'),
  connection_string = `mongodb://${config.mongodb.ip}:${config.mongodb.port}/${config.mongodb.database}`;


Mongoose.Promise = Promise;
Mongoose.connect(connection_string);