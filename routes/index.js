'use strict';

const express  = require('express'),
  router = express.Router(),
  UserModel = require('../database/models/User');

router.post('/', (req, res) => {
  UserModel.findBy(req.body, req.app.locals.user)
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

module.exports = router;