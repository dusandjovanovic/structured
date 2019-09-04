const mongoose = require("mongoose");

const GraphSchema = new mongoose.Schema({
	nodes: [
		{
			index: Number,
			key: String,
			vx: Number,
			vy: Number,
			x: Number,
			y: Number,
			inEdges: [String],
			outEdges: [String]
		}
	],
	edges: [
		{
			index: Number,
			key: String,
			source: {
				index: Number,
				key: String,
				vx: Number,
				vy: Number,
				x: Number,
				y: Number,
				inEdges: [String],
				outEdges: [String]
			},
			target: {
				index: Number,
				key: String,
				vx: Number,
				vy: Number,
				x: Number,
				y: Number,
				inEdges: [String],
				outEdges: [String]
			}
		}
	]
});

module.exports = mongoose.model("Graph", GraphSchema);
