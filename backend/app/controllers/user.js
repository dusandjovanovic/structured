const User = require("../models/user");
const { validationResult, body, param } = require("express-validator");

exports.validate = method => {
	switch (method) {
		case "/authenticate/api/register/post": {
			return [body("username").exists(), body("password").exists()];
		}
		case "/authenticate/api/login/post": {
			return [body("username").exists(), body("password").exists()];
		}
		case "/api/user/username/get": {
			return [
				param("username")
					.exists()
					.custom(async value => {
						return (await User.isUserByUsername(value))
							? Promise.resolve()
							: Promise.reject();
					})
			];
		}
		case "/api/user/username/history/get": {
			return [
				param("username")
					.exists()
					.custom(async value => {
						return (await User.isUserByUsername(value))
							? Promise.resolve()
							: Promise.reject();
					})
			];
		}
		case "/api/user/username/history/post": {
			return [
				param("username")
					.exists()
					.custom(async value => {
						return (await User.isUserByUsername(value))
							? Promise.resolve()
							: Promise.reject();
					}),
				body("score").exists()
			];
		}
		default: {
			return [];
		}
	}
};

exports.get = function(request, response, next) {
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	const { username } = request.params;

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
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	const { username } = request.params;

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
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	const { username } = request.params;
	const { score } = request.body;

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
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	const { username, password } = request.body;

	User.register(new User({ username: username }), password, function(error) {
		if (error) {
			response.status(500).send(error);
		} else {
			global.passport.authenticate("local", function(error, user, info) {
				if (error) return next(error);
				else if (!user) return next(info);
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
	const validation = validationResult(request);
	if (!validation.isEmpty()) return next({ validation: validation.mapped() });

	global.passport.authenticate("local", function(error, user, info) {
		if (error) return next(error);
		else if (!user) return next(info);
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
