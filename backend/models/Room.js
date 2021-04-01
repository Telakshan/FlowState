const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  issueName: { type: String, required: true },
  messages: [
    {
      name: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Room", RoomSchema);
