const io = require("socket.io")(65080);
require("./socketio/chat-io")(io);
require("./socketio/graph-io")(io);
module.exports = io;
