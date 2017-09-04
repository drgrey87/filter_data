'use strict';

const express  = require('express'),
  router = express.Router(),
  config = require('../config/config'),
  UserModel = require('../database/models/User');

router.get('/', (req, res) => {
  res.render('index', {
    data: config.filter_data
  });
});

router.get('/data/*', (req, res) => {
  let data = req.data;
  res.send(data);
});

module.exports = router;