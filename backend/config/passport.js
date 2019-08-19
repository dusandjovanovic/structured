"use strict";

const local = require("./passport/local");
const User = require("../app/models/user");

module.exports = function(passport) {
	passport.use(User.createStrategy());
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
	passport.use(local);
};
