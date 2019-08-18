const io = require("socket.io")();
require("./socketio/chat-io")(io);
require("./socketio/graph-io")(io);

module.exports = io;