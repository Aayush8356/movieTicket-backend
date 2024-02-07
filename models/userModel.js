const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "email address is already take"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
