const LocalStrategy = require("passport-local").Strategy;
const User = require("../../app/models/user");

module.exports = new LocalStrategy(User.authenticate());
