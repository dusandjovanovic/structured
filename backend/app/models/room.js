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

RoomSchema.statics = {
	isRoomById(id) {
		return this.findById(id, function(error, room) {
			if (error || !room) return false;
		});
	},
	isRoomByName(name) {
		return this.findOne({ name: name }, function(error, room) {
			if (error || !room) return false;
		});
	}
};

module.exports = mongoose.model("RoomSchema", RoomSchema);
