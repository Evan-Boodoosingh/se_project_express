const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
  },
  avatar: {
    type: String,
    required: [true, 'The "avatar" field must be filled in'],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "you must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, 'The "email" field must be filled in'],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "you must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, 'The "password" field must be filled in'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
