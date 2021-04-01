const express = require("express");
const roomControllers = require("../controllers/room-controllers");
const { body } = require("express-validator");
const router = express.Router();

router.get("/:roomId", roomControllers.getMessages);

router.post(
  "/createissue",
  [body("issueName", "Issue name is required").not().isEmpty()],
  roomControllers.createRoom
);

router.post(
  "/message/:roomId",
  [body("message").not().isEmpty()],
  roomControllers.sendMessage
);

router.get("/", roomControllers.getIssueList);

module.exports = router;
