const User = require("../models/user");

exports.get = function(request, response, next) {
	const { username } = request.params;
	if (!username)
		return next({ message: "Username key is required in params" });

	User.findOne({ username: username }, function(error, user) {
		if (error) return next(error);
		else if (!user)
			return next({
				message: "User with username provided does not exist."
			});
		else
			response.json({
				success: true,
				data: user
			});
	});
};

exports.getHistory = function(request, response, next) {
	const { username } = request.params;
	if (!username)
		return next({ message: "Username key is required in params" });

	User.findOne({ username: username }, function(error, user) {
		if (error) return next(error);
		else if (!user)
			return next({
				message: "User with username provided does not exist."
			});
		else
			response.json({
				success: true,
				data: user.history
			});
	});
};

exports.putHistory = function(request, response, next) {
	const { username } = request.params;
	const { score } = request.body;
	if (!username)
		return next({ message: "Username key is required in params" });

	User.update(
		{ username: username },
		{
			$push: {
				history: {
					score: score
				}
			}
		},
		function(error) {
			if (error) return next(error);
			else
				response.json({
					success: true,
					message: "Score successfully added to user history."
				});
		}
	);
};

exports.register = function(request, response, next) {
	const { username, password } = request.body;
	if (!username || !password)
		return next({ message: "Username/password key is required in params" });

	User.register(new User({ username: username }), password, function(
		error,
		user
	) {
		if (error) {
			response.status(500).send(error);
		} else {
			global.passport.authenticate("local", function(error, user, info) {
				if (error) return next(error);
				else if (!user) return next({ message: "User not present." });
				request.login(user, function(error) {
					if (error) return next(error);
					response.json({
						success: true,
						user: user
					});
				});
			})(request, response, next);
		}
	});
};

exports.login = function(request, response, next) {
	const { username, password } = request.body;
	if (!username || !password)
		return next({ message: "Username/password key is required in params" });

	global.passport.authenticate("local", function(error, user, info) {
		if (error) return next(error);
		else if (!user) return next();
		request.login(user, function(error) {
			if (error) return next(error);
			response.json({
				success: true,
				user: user
			});
		});
	})(request, response, next);
};

exports.logout = function(request, response) {
	request.logout();
	response.json({
		success: true
	});
};
