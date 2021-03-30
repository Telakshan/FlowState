const express = require("express");
const roomControllers = require("../controllers/room-controllers");
const { body } = require("express-validator");
const router = express.Router();

router.get("/:roomId", roomControllers.getMessages);

router.post(
  "/createroom",
  [body("name", "Name is required").not().isEmpty()],
  roomControllers.createRoom
);

router.post(
  "/message/:roomId",
  [body("message").not().isEmpty()],
  roomControllers.sendMessage
);

module.exports = router;
