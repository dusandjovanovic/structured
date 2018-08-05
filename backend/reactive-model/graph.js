module.exports = function(io) {
  var graph = io.of('/chat');
  graph.on('connection', (client) => {
    var gotGraph = false;
    graph.emit('get graph');

    client.on('get graph', (graph) => {
      client.emit('set graph', graph);
    });

    client.on('graph change', (rcv) => {
      //graph.emit(rcv.room, {sender: rcv.sender, msg: rcv.msg});
    });
  });
};
  