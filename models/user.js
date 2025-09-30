const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" feild must be filled in'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
  },
  avatar: {
    type: String,
    require: [true, 'The "avatar" feild must be filled in'],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "you must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema)