const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {type: String, required: true},
    users: [{type: mongoose.Types.ObjectId, required: truee, ref: 'User'}],
    messages: [{type: mongoose.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Room', RoomSchema);