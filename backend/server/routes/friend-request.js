var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var FriendRequest = require('../models/FriendRequest.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET FRIEND REQUESTS */
router.get('/:username', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var username = req.params.username;
    if (!username) {
      res.json({success: false, msg: 'Please pass username.'});
    } else {
      FriendRequest.find({receiver: username}, function(err, requests) {
        if (err || !requests) {
          res.json({});
        } else {
          res.json(requests);
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* GET FRIEND REQUESTS */
router.get('/check', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var sender = req.body.sender;
    var receiver = req.body.receiver;
    if (!sender || !receiver) {
      res.json({success: false, msg: 'Please pass username and friendname.'});
    } else {
      FriendRequest.findOne({
        sender: sender,
        receiver: receiver
      }, function(err, request) {
        if (request) {
          res.json({exists: true});
        } else {
          res.json({exists: false});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* ADD FRIEND REQUEST */
router.post('/add', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var sender = req.body.sender;
    var receiver = req.body.receiver;
    if (!sender || !receiver) {
      res.json({success: false, msg: 'Please pass username and friendname.'});
    } else {
      FriendRequest.findOne({
        sender: sender,
        receiver: receiver
      }, function(err, request) {
        if (!request) {
          User.findOne({username: receiver}, function(err, user) {
            if (err || !user) {
              res.json({success: false, msg: 'User not found.'});
            } else {
              FriendRequest.create({
                sender: sender,
                receiver: receiver
              }, function(err) {
                if (err) {
                  res.json({success: false, msg: 'Friend was not added.'});
                } else {
                  res.json({success: true, msg: 'Successfully sent a friend request.'});
                }
              });
            }
          });
        } else {
          res.json({success: false, msg: 'This request already exists.'});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* CONFIRM FRIEND REQUEST */
router.post('/confirm', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var id = req.body.id;
    if (!id) {
      res.json({success: false, msg: 'Please pass id of the request.'});
    } else {
      FriendRequest.findById(id, function(err, request) {
        if (err || !request) {
          res.json({success: false, msg: 'Request not found.'});
        } else {
          User.update({username: request.sender},
            {$push: {friends: request.receiver}},
            function(err) {
              if (err) {
                res.json({success: false, msg: 'User ' + request.sender + ' does not exist.'});
              }
          });
          User.update({username: request.receiver},
            {$push: {friends: request.sender}},
            function(err) {
              if (err) {
                res.json({success: false, msg: 'Something went wrong.'});
              } else {
                res.json({success: true, msg: 'Successfully added ' + request.sender + ' as a friend.'});
                // delete the request
                FriendRequest.deleteOne({_id: id}, function(err) {
                  if (err) {
                    res.json({success: false, msg: 'Something went wrong.'});
                  }
                });
              }
          });
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* DELETE FRIEND REQUEST */
router.delete('/delete', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var id = req.body.id;
    if (!id) {
      res.json({success: false, msg: 'Please pass id of the request.'});
    } else {
      FriendRequest.deleteOne({_id: id}, function(err) {
        if (err) {
          res.json({success: false, msg: 'Something went wrong.'});
        } else {
          res.json({success: true, msg: 'Successfully deleted the request.'});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

module.exports = router;
