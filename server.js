'use strict';

const app = require('./app'),
  config = require('./config/config');

app.listen(config.app_port, () => {
  console.log(`Example app listening on port ${config.app_port}!`);
});