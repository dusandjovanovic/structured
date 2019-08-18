"use strict";

const home = require("../app/controllers/home");
const user = require("../app/controllers/user");
const room = require("../app/controllers/room");
const graph = require("../app/controllers/graph");
const friendRequest = require("../app/controllers/friend-request");

module.exports = function(app, passport) {
	global.passport = passport;

	app.get("/", home.index);

	app.post("/api/logout", authenticated, user.logout);

	app.post(
		"/api/register",
		user.validate("/authenticate/api/register/post"),
		user.register
	);

	app.post(
		"/api/login",
		user.validate("/authenticate/api/login/post"),
		user.login
	);

	app.get(
		"/api/user/:username",
		authenticated,
		user.validate("/api/user/username/get"),
		user.get
	);

	app.get(
		"/api/user/:username/history",
		authenticated,
		user.validate("/api/user/username/history/get"),
		user.getHistory
	);

	app.put(
		"/api/user/:username/history",
		authenticated,
		user.validate("/api/user/username/history/post"),
		user.putHistory
	);

	app.get(
		"/api/friend-request/:username",
		authenticated,
		friendRequest.validate("/api/friend-request/username/get"),
		friendRequest.get
	);

	app.post(
		"/api/friend-request/check",
		authenticated,
		friendRequest.validate("/api/friend-request/check/post"),
		friendRequest.postCheck
	);

	app.post(
		"/api/friend-request/add",
		authenticated,
		friendRequest.validate("/api/friend-request/add/post"),
		friendRequest.postAdd
	);

	app.post(
		"/api/friend-request/confirm",
		authenticated,
		friendRequest.validate("/api/friend-request/confirm/post"),
		friendRequest.postConfirm
	);

	app.delete(
		"/api/friend-request/:id",
		authenticated,
		friendRequest.validate("/api/friend-request/id/delete"),
		friendRequest.delete
	);

	app.get(
		"/api/room/:mode",
		authenticated,
		room.validate("/api/room/mode/get"),
		room.get
	);

	app.get(
		"/api/room/get/:name",
		authenticated,
		room.validate("/api/room/get/name/get"),
		room.getRoomByName
	);

	app.get(
		"/api/room/graph/:name",
		authenticated,
		room.validate("/api/room/graph/name/get"),
		room.getGraphByName
	);

	app.put(
		"/api/room/graph/:name",
		authenticated,
		room.validate("/api/room/graph/name/put"),
		room.putGraph
	);

	app.post(
		"/api/room/create",
		authenticated,
		room.validate("/api/room/create/post"),
		room.postCreate
	);

	app.post(
		"/api/room/join",
		authenticated,
		room.validate("/api/room/join/post"),
		room.postJoin
	);

	app.post(
		"/api/room/leave",
		authenticated,
		room.validate("/api/room/leave/post"),
		room.postLeave
	);

	app.delete(
		"/api/room/:id",
		authenticated,
		room.validate("/api/room/id/delete"),
		room.delete
	);

	app.get(
		"/api/graph",
		graph.validate("/api/graph/get"),
		authenticated,
		graph.get
	);

	app.post(
		"/api/graph",
		graph.validate("/api/graph/post"),
		authenticated,
		graph.post
	);

	app.use(function(error, request, response, next) {
		if (error.message && ~error.message.indexOf("not found")) {
			return next();
		} else if (error.errmsg) {
			console.error(error.errmsg);
			response.status(420).send({ message: error.errmsg });
		} else if (error.errors && error.errors.length) {
			console.error(error);
			response
				.status(420)
				.send({ message: JSON.stringify(error.errors) });
		} else {
			console.error(error.stack);
			response.status(500).send(error);
		}
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
