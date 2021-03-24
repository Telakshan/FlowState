const User = require("../models/User");
const HttpError = require("../models/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
const secret = config.get("jwtSecret");
const { body, validationResult } = require("express-validator");

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { email, name, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Log in failed", 500));
  }

  if (existingUser) {
    return next(
      new HttpError(`Email already exists, Couldn't log you in`, 422)
    );
  }

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(`Signing up failed, Check database`, 500));
  }

  let token;

  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      secret,
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError(`Signing up failed`, 500));
  }

  res
    .status(201)
    .json({ user: createdUser.id, email: createdUser.email, token: token });
};

const Login = async (req, res, next) => {
  const {email, password} = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({email: email});
  } catch (error) {
    return next(new HttpError(`Logging in failed`, 500));
  }

}

const getAllUsers = async (rq, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(new HttpError(`Couldn't find any users`, 500));
  }

  if (users.length === 0) {
    return next(new HttpError(`Couldn't find any users`, 404));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
