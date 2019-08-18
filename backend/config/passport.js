"use strict";

const mongoose = require("mongoose");
const local = require("./passport/local");

const User = mongoose.model("User");

module.exports = function(passport) {
	passport.use(User.createStrategy());
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
	passport.use(local);
};
