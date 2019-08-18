const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema({
	sender: {
		type: String,
		required: true
	},
	receiver: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		required: false,
		default: Date.now
	}
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
