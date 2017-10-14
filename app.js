'use strict';

const express = require('express'),
  path = require('path'),
  exphbs = require('express-handlebars'),
  handle_bars_helpers = require('./helpers/handlebars_helpers'),
  config = require('./config/config'),
  db = require('./database/mongodb'),
  serveStatic = require('serve-static'),
  router = require('./routes'),
  bodyParser = require('body-parser'),
  UserModel = require('./database/models/User'),
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
app.use(function(req, res, next) {
  if(!req.app.locals.user) {
    UserModel.findOne({})
      .then(data => {
        app.locals.user = data;
        next();
      })
      .catch(err => console.log(err));
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use('/data', router);


app.get('/', (req, res) => {
  res.render('index', {
    data: config.filter_data
  });
});
app.get('/user_page/:id', (req, res) => {
  res.render('index', {
    data: config.filter_data
  });
});
app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

module.exports = app;