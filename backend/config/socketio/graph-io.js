module.exports = function(io) {
	const graph = io.of("/graph");

	graph.on("connection", client => {
		client.on("graph change", from => {
			graph.emit(from.room + " graph change", { graph: from.graph });
		});

		client.on("add node", from => {
			graph.emit(from.room + " add node", {
				sender: from.sender,
				node: from.node
			});
		});

		client.on("remove node", from => {
			graph.emit(from.room + " remove node", {
				sender: from.sender,
				node: from.node
			});
		});

		client.on("add edge", from => {
			graph.emit(from.room + " add edge", {
				sender: from.sender,
				edge: from.edge
			});
		});

		client.on("remove edge", from => {
			graph.emit(from.room + " remove edge", {
				sender: from.sender,
				edge: from.edge
			});
		});

		client.on("compete begin", from => {
			graph.emit(from.room + " compete begin", {
				agName: from.agName,
				root: from.root
			});
		});

		client.on("compete end", from => {
			graph.emit(from.room + " compete end", {
				user: from.user,
				score: from.score
			});
		});

		client.on("algorithm begin", from => {
			graph.emit(from.room + " algorithm begin", {
				agName: from.agName,
				agIterations: from.agIterations,
				root: from.root
			});
		});

		client.on("algorithm end", from => {
			graph.emit(from.room + " algorithm end");
		});

		client.on("master changed", from => {
			graph.emit(from.room + " master changed", {
				msg: "Master left. New master is " + from.master + "."
			});
		});

		client.on("join", from => {
			graph.emit(from.master, { username: from.username });
		});

		client.on("join and leave room", from => {
			graph.emit(from.room + " join and leave room", {
				msg: from.msg
			});
		});

		client.on("delete room", from => {
			graph.emit(from.room + " delete room");
		});
	});
};
