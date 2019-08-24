const io = require("socket.io")();
require("./socketio/chat-io")(io);
require("./socketio/graph-io")(io);
io.listen(65080);
module.exports = io;
