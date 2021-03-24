const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String },
  sender: {
      type: mongoose.Types.ObjectId, ref: 'User'
  }
});

module.exports = mongoose.model('Message'. MessageSchema);