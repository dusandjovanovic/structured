module.exports = function(io) {
	const chat = io.of("/chat");

	chat.on("connection", socket => {
		socket.on("initWebsocket", from => {
			socket.join(from.room);
		});

		socket.on("newMessage", from => {
			socket.broadcast
				.to(from.room)
				.emit("newMessage", { sender: from.sender, msg: from.msg });
		});
	});
};
