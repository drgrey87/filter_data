var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();

//app.use('/assets', express.static(__dirname + '/assets'));
// app.use(serveStatic(path.join(__dirname, 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.send({})
});
app.listen(1230);