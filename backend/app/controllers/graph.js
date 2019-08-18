const Graph = require("../models/graph");

exports.get = function(request, response, next) {
	const { id } = request.params;
	if (!id) return next({ message: "Id key is required in params." });

	Graph.findOne({ _id: id }, function(error, graph) {
		if (error) return next(error);
		else if (!user)
			return next({
				message: "User with username provided does not exist."
			});
		else
			response.json({
				success: true,
				data: graph
			});
	});
};

exports.post = function(request, response, next) {
	const { graph } = request.body;
	if (!graph) return next({ message: "Graph key is required in body." });

	Graph.create(
		{
			nodes: graph.nodes,
			edges: graph.edges
		},
		function(error) {
			if (error) return next(error);
			else
				response.json({
					success: true
				});
		}
	);
};
