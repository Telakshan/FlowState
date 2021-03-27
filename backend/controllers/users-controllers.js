const User = require("../models/User");
const HttpError = require("../models/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtSecret");
const { body, validationResult } = require("express-validator");

//Register
const register = async (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    console.log(errors);
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
    res.json({ msg: "Email already exists" });
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
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

//Log in
const Login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError(`Logging in failed`, 500));
  }

  if (!existingUser) {
    return next(new HttpError(`Invalid credentials, Couldn't log in`, 500));
  }

  let isValid = false;

  try {
    isValid = await bcrypt.compareSync(password, existingUser.password);
  } catch (error) {
    return next(new HttpError(`Invalid Credentials, Couldn't log in`, 401));
  }

  if (!isValid) {
    return next(new HttpError(`Invalid Credentials, Couldn't log in`, 500));
  }

  let token;

  try {
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        secret,
        { expiresIn: "1h" }
      );
    } catch (error) {
      return next(new HttpError(`Signing up failed`, 500));
    }
  } catch (error) {
    return next(new HttpError(`Logging in failed`, 500));
  }

  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token: token });
};

const getAllUsers = async (req, res, next) => {
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

exports.getAllUsers = getAllUsers;
exports.Login = Login;
exports.register = register;
