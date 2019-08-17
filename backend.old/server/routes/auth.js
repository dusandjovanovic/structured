var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

router.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  //var about = req.body.about;
  if (!username || !password){// || !about) {
    res.send({success: false, msg: 'Please populate all the fields.'});
  } else {
    var newUser = new User({
      username: username,
      password: password//,
     // about: about
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        res.send({success: false, msg: 'Username already exists.'});
      } else {
        res.send({success: true, msg: 'Successful created new user.'});
      }
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      res.send({success: false, msg: 'MongoDB error: ' + err});
    } else if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.send({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

module.exports = router;