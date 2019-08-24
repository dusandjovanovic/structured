module.exports = function(io) {
	const chat = io.of("/chat");

	chat.on("connection", client => {
		client.on("chat message", from => {
			chat.emit(from.room, { sender: from.sender, msg: from.msg });
		});
	});
};
