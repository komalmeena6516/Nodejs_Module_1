const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    strict: false,
  }
);

module.exports = Mongoose.model("users", User);