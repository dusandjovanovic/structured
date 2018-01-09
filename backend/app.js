var mongoose = require('mongoose');
var graph = require('./graph');

mongoose.connect('mongodb://localhost/structured');

var g = new graph({
    edges : [{
      index: 0,
      source: {
        id : 0,
        index : 0,
        linkCount : 1,
        vx : 0.0,
        vy : 0.0,
        x : 1000.0,
        y : 500.0
      },
      target: {
        id : 1,
        index : 1,
        linkCount : 1,
        vx : 0.0,
        vy : 0.0,
        x : 1000.0,
        y : 400.0
      }
    }],
    lastIndex : 1,
    nodes : [{
      id : 0,
      index : 0,
      linkCount : 1,
      vx : 0.0,
      vy : 0.0,
      x : 1000.0,
      y : 500.0
    }, {
      id : 1,
      index : 1,
      linkCount : 1,
      vx : 0.0,
      vy : 0.0,
      x : 1000.0,
      y : 400.0
    }]
});

g.save(function (err) {
    if (err) {
        console.log(err);
    }
});
