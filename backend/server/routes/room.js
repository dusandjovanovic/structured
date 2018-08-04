var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/Room.js');
var passport = require('passport');
require('../config/passport')(passport);

router.get('/:mode', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var mode = req.params.mode;
    if (mode === 'all') {
      Room.find(function(err, rooms) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else {
          res.send({success: true, data: rooms});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

router.post('/', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var name = req.body.name;
    var maxUsers = req.body.maxUsers;
    if (!name || !maxUsers) {
      res.send({success: false, msg: 'Please pass username and friendname.'});
    } else {
      Room.create({
        name: name,
        currentUsers: 0,
        maxUsers: maxUsers
      }, function(err) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else {
          res.send({success: true, msg: 'Successfully created a room.'});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

module.exports = router;
