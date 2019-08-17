module.exports = function(io) {
  var chat = io.of('/chat');
  
  chat.on('connection', (client) => {
    client.on('chat message', (rcv) => {
      chat.emit(rcv.room, {sender: rcv.sender, msg: rcv.msg});
    });
  });
};
