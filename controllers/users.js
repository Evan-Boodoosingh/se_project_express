const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  DocumentNotFoundError,
  ValidationError,
  UnauthorizedError,
  ConflictError,
  InternalServerError,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // Hash the password before saving
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) => {
      // Remove password from response (select: false doesn't apply to create operations)
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        // Duplicate email error
        return res.status(ConflictError).send({
          message: "An account with this email already exists",
        });
      }
      if (err.name === "ValidationError") {
        return res.status(ValidationError).send({ message: err.message });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DocumentNotFoundError)
          .send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(ValidationError).send({ message: "Invalid user ID" });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email) {
    return res.status(ValidationError).send({
      message: 'The "email" field must be filled in',
    });
  }
  if (!password) {
    return res.status(ValidationError).send({
      message: 'The "password" field must be filled in',
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Create JWT token that expires in 7 days
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res.status(UnauthorizedError).send({
          message: "Incorrect email or password",
        });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DocumentNotFoundError)
          .send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res.status(ValidationError).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(ValidationError).send({ message: "Invalid user ID" });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateUser };
