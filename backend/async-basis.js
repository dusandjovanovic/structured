var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var bodyParser = require('body-parser');
var graph = require('./graph');
var socketIO = require('socket.io');

mongoose.connect('mongodb://localhost/structured');

var app = express();
app.server = http.createServer(app);

//////////////////////////////////////////////

var io = socketIO(app.server);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('new-message', (message) => {
    socket.broadcast.emit('new-message', message);
  });

  socket.on('new-node', (node) => {
    console.log(node);
    socket.broadcast.emit('new-node', node);
  });

  socket.on('new-edge', (edge) => {
    console.log('Edge', edge);
    socket.broadcast.emit('new-edge', edge);
  });
});

/////////////////////////////////////////////

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/graphs', (req, res) => {
    graph.find().remove().exec();

   // console.log(req.body[0]);

    var json_graph = '{"edges": ' + req.body[1] + ', "lastIndex": ' + req.body[2] + ', "nodes": ' + req.body[0] + '}';

    graph.create(JSON.parse(json_graph), function (err, graph) {
        if (err)
            res.send(err);

        res.json(2);
    });
});

app.get('/graphs', (req, res) => {
    graph.find(function(err, graph) {
        if (err)
            console.log(err);

        res.json(graph.pop());
    });
});

app.server.listen(port, '0.0.0.0', () => {
     console.log('started listening on port 3000');
});
