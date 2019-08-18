const LocalStrategy = require("passport-local").Strategy;
const User = require("../../app/models/user");

module.exports = new LocalStrategy(
	{
		usernameField: "username",
		passwordField: "password"
	},
	function(username, password, done) {
		User.findOne(
			{
				username: username
			},
			function(err, user) {
				if (err) return done(err);
				if (!user) {
					return done(null, false, {
						message: "User with username provided does not exist."
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: "Password is invalid. Please try again."
					});
				}
				return done(null, user);
			}
		);
	}
);
