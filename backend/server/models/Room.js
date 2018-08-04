var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
  name: String,
  users: [{
    type: String
  }],
  currentUsers: Number,
  maxUsers: Number,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', RoomSchema);
