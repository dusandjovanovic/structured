var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room = require('../models/Room.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL ROOMS */
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

/* GET ROOM */
router.get('/get/:name', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var name = req.params.name;
    if (!name) {
      res.send({success: false, msg: 'Please pass name of the room.'});
    } else {
      Room.findOne({name: name}, function(err, room) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else {
          res.send({success: true, data: room});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* GET ROOM */
router.get('/get-graph/:name', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var name = req.params.name;
    if (!name) {
      res.send({success: false, msg: 'Please pass name of the room.'});
    } else {
      Room.findOne({name: name}, function(err, room) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else {
          res.send({success: true, data: room.graph});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* CREATE ROOM */
router.post('/', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var name = req.body.name;
    var maxUsers = req.body.maxUsers;
    var createdBy = req.body.createdBy;
    var roomType = req.body.roomType;
    if (!name || !maxUsers || !createdBy || !roomType) {
      res.send({success: false, msg: 'Please pass all the arguments.'});
    } else {
      Room.create({
        name: name,
        currentUsers: 1,
        maxUsers: maxUsers,
        createdBy: createdBy,
        users: [createdBy],
        roomType: roomType,
        graph: []
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

/* JOIN ROOM */
router.post('/join', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var roomName = req.body.roomName;
    var username = req.body.username;
    if (!roomName || !username) {
      res.send({success: false, msg: 'Please pass roomName and username.'});
    } else {
      Room.findOne({name: roomName}, function(err, room) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else if (!room) {
          res.send({success: false, msg: 'Room not found.'});
        } else {
          if (room.currentUsers === room.maxUsers) {
            res.send({success: false, msg: 'Room is full.'});
          } else {
            var cu = room.currentUsers + 1;
            Room.update({name: roomName},
              {
                currentUsers: cu,
                $push: {users: username}
              },
              function(err) {
                if (err) {
                  res.send({success: false, msg: 'MongoDB error: ' + err});
                } else {
                  res.send({success: true, msg: 'Joined room.'});
                }
              });
          }
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* LEAVE ROOM */
router.post('/leave', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var roomName = req.body.roomName;
    var username = req.body.username;
    if (!roomName || !username) {
      res.send({success: false, msg: 'Please pass roomName and username.'});
    } else {
      Room.findOne({name: roomName}, function(err, room) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else if (!room) {
          res.send({success: false, msg: 'Room not found.'});
        } else {
          if (room.users.includes(username)) {
            var index = room.users.indexOf(username);
            room.users.splice(index, 1);
            var cu = room.currentUsers - 1;
            Room.update({name: roomName},
              {
                currentUsers: cu,
                users: room.users
              },
              function(err) {
                if (err) {
                  res.send({success: false, msg: 'MongoDB error: ' + err});
                } else {
                  res.send({success: true, msg: 'Room left.'});
                }
              });
          } else {
            res.send({success: true, msg: 'User not in the room.'});
          }
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* UPDATE GRAPH */
router.put('/:name', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var roomName = req.params.name;
    var array = req.body.graph;
    if (!roomName) {
      res.send({success: false, msg: 'Please pass name of the room.'});
    } else {
      Room.update({ name: roomName },
        {
          $set: {graph: array}
        },
        function(err) {
          if (err) {
            res.send({success: false, msg: 'MongoDB error: ' + err});
          } else {
            res.send({success: true, msg: 'Graph updated.'});
          }
        });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* DELETE ROOM */
router.delete('/:id', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var id = req.params.id;
    if (!id) {
      res.send({success: false, msg: 'Please pass id of the room.'});
    } else {
      Room.deleteOne({_id: id}, function(err) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else {
          res.send({success: true, msg: 'Successfully deleted room.'});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

module.exports = router;
