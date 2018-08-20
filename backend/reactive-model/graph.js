module.exports = function(io) {
  var graph = io.of('/graph');

  graph.on('connection', (client) => {

    client.on('get graph', (rcv) => {
      graph.emit(rcv.masterName, {username: rcv.username});
    });

    client.on('graph', (rcv) => {
      graph.emit(rcv.username, {graph: rcv.graph});
    });

    client.on('graph change', (rcv) => {
      graph.emit('graph change', {graph: rcv.graph});
    });

    client.on('add node', (rcv) => {
      graph.emit(rcv.room + ' add node', {sender: rcv.sender, node: rcv.node});
    });

    client.on('remove node', (rcv) => {
      graph.emit(rcv.room + ' remove node', {sender: rcv.sender, node: rcv.node});
    });

    client.on('add edge', (rcv) => {
      graph.emit(rcv.room + ' add edge', {sender: rcv.sender, edge: rcv.edge});
    });

    client.on('remove edge', (rcv) => {
      graph.emit(rcv.room + ' remove edge', {sender: rcv.sender, edge: rcv.edge});
    });

    client.on('compete begin', (rcv) => {
      graph.emit(rcv.room + ' compete begin', {agName: rcv.agName, root: rcv.root});
    });

    client.on('compete end', (rcv) => {
      graph.emit(rcv.room + ' compete end', {user: rcv.user, score: rcv.score});
    });

  });
};
  