const Graph = require("../models/graph");
const { validationResult, body, param } = require("express-validator");

exports.validate = method => {
	switch (method) {
		case "/api/graph/get": {
			return [param("id").exists()];
		}
		case "/api/graph/post": {
			return [body("graph").exists()];
		}
		default: {
			return [];
		}
	}
};

exports.get = function(request, response, next) {
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ errors: validation.array() });

	const { id } = request.params;

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
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ errors: validation.array() });

	const { graph } = request.body;

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
