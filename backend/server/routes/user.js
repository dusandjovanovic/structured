var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET USER */
router.get('/:username', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var username = req.params.username;
    User.findOne({username: username}, function(err, user) {
      if (err) {
        res.send({success: false, msg: "MongoDB error: " + err});
      } else if (!user) {
        res.send({success: false, msg: "User not found."});
      } else {
        res.send({success: true, data: user});
      }
    });
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
