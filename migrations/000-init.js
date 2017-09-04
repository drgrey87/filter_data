const filter_data = require('../config/filter_data.json'),
  User = require('../database/models/User');

exports.up = (next) => {
  User.insertMany(filter_data)
    .then(mongooseDocuments => next)
    .catch(err => console.log(err));
};
