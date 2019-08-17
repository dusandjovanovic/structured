var mongoose = require('mongoose');

var FriendRequestSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FriendRequest', FriendRequestSchema);
