const mongoose = require("mongoose");
const GraphSchema = new mongoose.Schema({ nodes: [], edges: [] });

const RoomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	roomType: {
		type: String,
		required: true
	},
	users: [
		{
			type: String
		}
	],
	currentUsers: {
		type: Number,
		required: true
	},
	maxUsers: {
		type: Number,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		required: false,
		default: Date.now
	},
	graph: GraphSchema
});

module.exports = mongoose.model("RoomSchema", RoomSchema);
