const filter_data = require('./filter_data.json');

module.exports = {
  app_port: 3000,
  user: filter_data.matches[0],
  filter_data,
  mongodb: {
    ip: 'localhost',
    port: 27017,
    database: 'filter'
  }
};