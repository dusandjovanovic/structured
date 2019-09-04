const mongoose = require("mongoose");
const GraphSchema = require("./graph");

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
	graphId: {
		type: String,
		default: null,
		required: false
	},
	graphTraversed: [
		{
			type: String
		}
	]
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

RoomSchema.post("remove", function(roomDocument) {
	const graphId = roomDocument.graphId;
	GraphSchema.deleteOne({ _id: graphId });
});

module.exports = mongoose.model("Room", RoomSchema);
