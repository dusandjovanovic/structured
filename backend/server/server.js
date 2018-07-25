var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var user = require('./routes/user');
var auth = require('./routes/auth');
var friendrequest = require('./routes/friend-request');
var app = express();

mongoose.connect('mongodb://localhost:27017/structured', {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true
})
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/friend-request', friendrequest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
