const Graph = require("../models/graph");
const { validationResult, body, param } = require("express-validator");

exports.validate = method => {
	switch (method) {
		case "/api/graph/get": {
			return [
				param("id")
					.exists()
					.isMongoId()
			];
		}
		case "/api/graph/post": {
			return [body("graph").exists()];
		}
		case "/api/graph/put": {
			return [
				param("id")
					.exists()
					.isMongoId(),
				body("graph").exists()
			];
		}
		default: {
			return [];
		}
	}
};

exports.getGraph = function(id, callback) {
	Graph.findOne({ _id: id }, function(error, object) {
		if (error) return callback(error);
		else return callback(null, object);
	});
};

exports.createGraph = function(graph, callback) {
	Graph.create(
		{
			nodes: (graph && graph.nodes) || [],
			edges: (graph && graph.edges) || []
		},
		function(error, object) {
			if (error) return callback(error);
			else return callback(null, object);
		}
	);
};

exports.deleteGraph = function(id, callback) {
	Graph.deleteOne(
		{
			_id: id
		},
		function(error) {
			if (error) return callback(error);
			else return callback(null, true);
		}
	);
};

exports.get = function(request, response, next) {
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	const { id } = request.params;

	exports.getGraph(id, function(error, graph) {
		if (error) return next(error);
		else
			response.json({
				success: true,
				data: graph
			});
	});
};

exports.post = function(request, response, next) {
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	let { graph } = request.body;

	exports.createGraph(graph, function(error) {
		if (error) return next(error);
		else
			response.json({
				success: true
			});
	});
};

exports.put = function(request, response, next) {
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	const { id } = request.params;
	const { graph } = request.body;

	Graph.findOneAndUpdate(
		{ _id: id },
		{ $set: { nodes: graph.nodes, edges: graph.edges } },
		{ new: true },
		function(error, graph) {
			if (error) return next(error);
			else
				response.json({
					success: true,
					graph: graph
				});
		}
	);
};
