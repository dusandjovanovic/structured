var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET GRAPH */
router.get('/:id', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var id = req.params.id;
    if (!id) {
      res.send({success: false, msg: 'Please pass the id of the graph.'});
    } else {
      Room.findOne({_id: id}, function(err, graph) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else {
          res.send({success: true, data: graph});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});

/* CREATE GRAPH */
router.post('/', /*passport.authenticate('jwt', {session: false}),*/ function(req, res) {
  var token = getToken(req.headers);
  //if (token) {
    var graph = req.body.graph;
    if (!graph) {
      res.send({success: false, msg: 'Please provide the graph to be saved.'});
    } else {
      Graph.create({
        nodes: graph.nodes,
        edges: graph.edges
      }, function(err) {
        if (err) {
          res.send({success: false, msg: 'MongoDB error: ' + err});
        } else {
          res.send({success: true, msg: 'Successfully saved the graph.'});
        }
      });
    }
  //} else {
  //  return res.status(403).send({success: false, msg: 'Unauthorized.'});
  //}
});
