const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  DocumentNotFoundErrorClass,
  NotFoundErrorClass,
  ConflictErrorClass,
  UnauthorizedErrorClass,
} = require("../utils/errors");

const getUsers = (req, res, next) =>
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      return res.status(201).send(userResponse);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictErrorClass("An account with this email already exists")
        );
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  if (!userId) {
    return next(new DocumentNotFoundErrorClass("User ID is required"));
  }

  return User.findById(userId)
    .orFail(() => new NotFoundErrorClass("User not found"))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(
      new DocumentNotFoundErrorClass('The "email" field must be filled in')
    );
  }
  if (!password) {
    return next(
      new DocumentNotFoundErrorClass('The "password" field must be filled in')
    );
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedErrorClass("Incorrect email or password"));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  if (!userId) {
    return next(new DocumentNotFoundErrorClass("User ID is required"));
  }

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundErrorClass("User not found"))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateUser };
