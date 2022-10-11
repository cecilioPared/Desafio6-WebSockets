var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
 
var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
 
 
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
