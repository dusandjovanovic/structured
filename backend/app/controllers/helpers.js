const Graph = require("../models/graph");

exports.createGraph = function(graph, callback) {
	if (!graph.nodes && !graph.edges)
		graph = {
			nodes: [],
			edges: []
		};

	Graph.create(
		{
			nodes: graph.nodes,
			edges: graph.edges
		},
		function(error, object) {
			if (error) return callback(error);
			else return callback(null, object["_id"]);
		}
	);
};
