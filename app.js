'use strict';

const express = require('express'),
  path = require('path'),
  exphbs = require('express-handlebars'),
  handle_bars_helpers = require('./helpers/handlebars_helpers'),
  config = require('./config/config'),
  db = require('./database/mongodb'),
  serveStatic = require('serve-static'),
  router = require('./routes'),
  app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: handle_bars_helpers
}));
app.set('view engine', '.hbs');
app.set('index', path.join(__dirname, 'views'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('*', router);

app.listen(config.app_port, () => {
  console.log(`Example app listening on port ${config.app_port}!`);
});