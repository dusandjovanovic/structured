module.exports = function(io) {
	const graph = io.of("/graph");

	graph.on("connection", socket => {
		socket.on("initWebsocket", from => {
			socket.join(from.room);
			socket.broadcast.to(from.room).emit("initMember");
		});

		socket.on("graphChange", from => {
			socket.broadcast
				.to(from.room)
				.emit("graphChange", { graph: from.graph });
		});

		socket.on("addNode", from => {
			socket.broadcast.to(from.room).emit("addNode", {
				sender: from.sender,
				node: from.node
			});
		});

		socket.on("removeNode", from => {
			socket.broadcast.to(from.room).emit("removeNode", {
				sender: from.sender,
				node: from.node
			});
		});

		socket.on("addEdge", from => {
			socket.broadcast.to(from.room).emit("addEdge", {
				sender: from.sender,
				edge: from.edge
			});
		});

		socket.on("removeEdge", from => {
			socket.broadcast.to(from.room).emit("removeEdge", {
				sender: from.sender,
				edge: from.edge
			});
		});

		socket.on("competeBegin", from => {
			socket.broadcast.to(from.room).emit("competeBegin", {
				agName: from.agName,
				root: from.root
			});
		});

		socket.on("competeEnd", from => {
			socket.broadcast.to(from.room).emit("competeEnd", {
				user: from.user,
				score: from.score
			});
		});

		socket.on("algorithmBegin", from => {
			socket.broadcast.to(from.room).emit("algorithmBegin", {
				agName: from.agName,
				agIterations: from.agIterations,
				root: from.root
			});
		});

		socket.on("algorithmEnd", from => {
			socket.broadcast.to(from.room).emit("algorithmEnd");
		});

		socket.on("masterChanged", from => {
			socket.broadcast.to(from.room).emit("masterChanged", {
				msg: "Master left. New master is " + from.master + "."
			});
		});

		socket.on("joinRoom", from => {
			socket.broadcast
				.to(from.room)
				.emit(from.master, { username: from.username });
		});

		socket.on("joinLeaveRoom", from => {
			socket.broadcast.to(from.room).emit("joinLeaveRoom", {
				msg: from.msg
			});
		});

		socket.on("deleteRoom", from => {
			socket.broadcast.to(from.room).emit("deleteRoom");
		});
	});
};
