const Room = require("../models/Room");
const User = require("../models/User");
const HttpError = require("../models/HttpError");
const { body, validationResult } = require("express-validator");

//Create Room
const createRoom = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Cannot create room", 422));
  }

  const { name } = req.body;

  const createdRoom = new Room({
    name,
  });

  try {
    await createdRoom.save();
  } catch (error) {
    return next(new HttpError("Cannot create room", 422));
  }
  res.status(200).json({ room: createdRoom.toObject({ getters: true }) });
};

//Delete Room
const deleteRoom = async (req, res, next) => {
  const errors = validationResult(req);
  const roomId = req.params.roomId;
  if (!errors.isEmpty()) {
    return next(new HttpError("Cannot", 422));
  }

  try {
    await Room.findByIdAndDelete(roomId);
  } catch (error) {
    return next(new HttpError("Cannot delete room", 422));
  }

  res.status(200).json({ msg: "Room deleted" });
};

//Send Message
const sendMessage = async (req, res, next) => {
  const errors = validationResult(req);
  const roomId = req.params.roomId;

  if (!errors.isEmpty()) {
    return next(new HttpError("Cannot send message, Error#1", 422));
  }
  let newMessage;
  let room;
  try {
    room = await Room.findById(roomId);
    const user = await User.findById(req.body.userId).select("-password");
    newMessage = {
      name: user.name,
      text: req.body.message,
    };
    room.messages.push(newMessage);
    room.save();
  } catch (error) {
    return next(new HttpError("Cannot send message", 422));
  }
  res.status(200).json({msg: 'Message sent'});
};

const getMessages = async (req, res, next) => {
  const errors = validationResult(req);
  const roomId = req.params.roomId;

  if (!errors.isEmpty()) {
    return next(new HttpError("Cannot send message, Error#1", 422));
  }

  let room;

  try {
    room = await Room.findById(roomId);
  } catch (error) {
    return next(new HttpError("Cannot find room", 422));
  }
  res.status(200).json({
    messages: room.messages.map((message) =>
      message.toObject({ getters: true })
    ),
  });
};

exports.getMessages = getMessages;
exports.createRoom = createRoom;
exports.deleteRoom = deleteRoom;
exports.sendMessage = sendMessage;
exports.deleteRoom = deleteRoom;
