"use strict";

require("dotenv").config();

const fs = require("fs");
const join = require("path").join;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");

const models = join(__dirname, "app/models");
const port = process.env.PORT || 8080;

const app = express();
const connection = connect();

module.exports = {
	app,
	connection
};

fs.readdirSync(models)
	.filter(file => ~file.indexOf(".js"))
	.forEach(file => require(join(models, file)));

require("./config/passport")(passport);
require("./config/express")(app, passport, connection);
require("./config/routes")(app, passport);
require("./config/socketio");

connection
	.on("error", console.log)
	.on("disconnected", connect)
	.once("open", listen);

function listen() {
	if (app.get("env") === "test") return;
	app.listen(port);
	console.info("Running on port " + port);
}

function connect() {
	var options = { keepAlive: 1, useNewUrlParser: true, useCreateIndex: true };
	mongoose.connect(config.db, options);
	return mongoose.connection;
}
