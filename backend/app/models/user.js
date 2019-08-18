const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	about: {
		type: String,
		required: false,
		default: ""
	},
	history: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			score: {
				type: Number,
				required: false,
				default: 0
			}
		}
	],
	friends: [
		{
			type: String
		}
	]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
