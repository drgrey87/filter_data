'use strict';

const express = require('express'),
  path = require('path'),
  exphbs = require('express-handlebars'),
  handle_bars_helpers = require('./helpers/handlebars_helpers'),
  config = require('./config/config'),
  app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: handle_bars_helpers
}));
app.set('view engine', '.hbs');
app.set('index', path.join(__dirname, 'views'));

require('./database/mongodb');

app.get('/', (req, res) => {
  res.render('index', {
    data: config.filter_data
  });
});

app.listen(config.app_port, () => {
  console.log(`Example app listening on port ${config.app_port}!`);
});