const express = require("express");
const session = require("express-session");
const compression = require("compression");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const helmet = require("helmet");
const cors = require("cors");

const mongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const winston = require("winston");
const helpers = require("view-helpers");
const config = require("./");
const pkg = require("../package.json");

const env = process.env.NODE_ENV || "development";

module.exports = function(app, passport, connection) {
	app.use(helmet());
	app.use(compression());
	app.use(express.static(config.root + "/public"));

	let log;
	if (env !== "development") {
		log = {
			stream: {
				write: msg => winston.info(msg)
			}
		};
	} else {
		log = "dev";
	}

	if (env !== "test") app.use(morgan(log));

	app.set("views", config.root + "/app/views");
	app.set("view engine", "pug");
	app.use(function(req, res, next) {
		res.locals.pkg = pkg;
		res.locals.env = env;
		next();
	});

	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);
	app.use(bodyParser.json());
	app.use(
		methodOverride(function(req) {
			if (
				req.body &&
				typeof req.body === "object" &&
				"_method" in req.body
			) {
				const method = req.body._method;
				delete req.body._method;
				return method;
			}
		})
	);

	app.use(cookieParser());
	app.use(
		session({
			secret: pkg.name,
			resave: false,
			saveUninitialized: false,
			store: new mongoStore({
				mongooseConnection: connection
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7
			}
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	app.use(helpers(pkg.name));
	app.use(
		cors({
			origin: function(origin, callback) {
				return callback(null, true);
			},
			optionsSuccessStatus: 200,
			credentials: true
		})
	);
};
