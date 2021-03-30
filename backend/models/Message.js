const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String },
  sender: {
      type: mongoose.Types.ObjectId, ref: 'User'
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Message'. MessageSchema);