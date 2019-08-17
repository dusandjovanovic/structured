"use strict";

const home = require("../app/controllers/home");
const user = require("../app/controllers/user");
const room = require("../app/controllers/room");
const friendRequest = require("../app/controllers/friend-request");

module.exports = function(app, passport) {
	global.passport = passport;

	app.get("/", home.index);

	app.post("/api/register", user.register);
	app.post("/api/login", user.login);
	app.post("/api/logout", authenticated, user.logout);

	app.get("/api/user/:username", authenticated, user.get);
	app.get("/api/user/:username/history", authenticated, user.getHistory);
	app.put("/api/user/:username/history", authenticated, user.putHistory);

	app.get("/api/friend-request/:username", authenticated, friendRequest.get);
	app.post(
		"/api/friend-request/check",
		authenticated,
		friendRequest.postCheck
	);
	app.post("/api/friend-request/add", authenticated, friendRequest.postAdd);
	app.post(
		"/api/friend-request/confirm",
		authenticated,
		friendRequest.postConfirm
	);
	app.delete("/api/friend-request/:id", authenticated, friendRequest.delete);

	app.get("/api/room/:mode", authenticated, room.get);
	app.get("/api/room/get/:name", authenticated, room.getRoomByName);
	app.get("/api/room/graph/:name", authenticated, room.getGraphByName);
	app.put("/api/room/graph/:name", authenticated, room.putGraph);
	app.post("/api/room/create", authenticated, room.postCreate);
	app.post("/api/room/join", authenticated, room.postJoin);
	app.post("/api/room/leave", authenticated, room.postLeave);
	app.delete("/api/room/:id", authenticated, room.delete);

	app.use(function(error, request, response, next) {
		if (error.message && ~error.message.indexOf("not found")) {
			return next();
		}
		console.error(error.stack);
		response.status(500).send(error);
	});

	app.use(function(req, res) {
		res.status(404).render("404", {
			url: req.originalUrl,
			error: "Not found"
		});
	});

	function authenticated(request, response, next) {
		if (request.isAuthenticated()) return next();
		else
			response.status(500).send({
				message: "Non-auth access denied."
			});
	}
};
