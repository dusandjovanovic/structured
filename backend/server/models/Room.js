var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
  name: String,
  roomType: String,
  users: [{
    type: String
  }],
  graph: [{
    type: Number
  }],
  currentUsers: Number,
  maxUsers: Number,
  createdBy: String,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', RoomSchema);
