"use strict";

const local = require("./passport/local");
const User = require("../app/models/user");

module.exports = function(passport) {
	passport.use(local);
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
};
