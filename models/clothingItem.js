const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" feild must be filled in'],
    minlength: [2, 'The minimum length of the "name" field is 2'],
    maxlength: [30, 'The maximum length of the "name" field is 30'],
  },
  weather: {
    type: String,
    required: [true, 'The "Weather" feild must be selected'],
    enum: ["warm", "hot", "cold"],
  },
  imageURL: {
    type: String,
    required: [true, 'The "imageURL" feild must be filled in'],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "you must enter a valid URL",
    },
    owner: {
      type: mongoose.Schema.Types.Object.Id,
      ref: user,
      required: true,
    },
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: {
    type: Date,
    defualt: Date.now,
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
