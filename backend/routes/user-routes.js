const express = require("express");
const userControllers = require("../controllers/users-controllers");
const { body } = require("express-validator");
const router = express.Router();

router.get("/", userControllers.getAllUsers);

router.post(
  "/register",
  [
    body("email").normalizeEmail().isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  userControllers.register
);

router.post("/login", userControllers.Login);

module.exports = router;
