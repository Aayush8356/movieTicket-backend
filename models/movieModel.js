const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  // title, poster, type, year
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please provide the title"],
    },
    poster: {
      type: String,
      required: [true, "URL"],
    },
    type: {
      type: String,
      required: [true, "Please provide a password"],
    },
    year: {
      type: String,
      required: [true, "Please provide the title"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movies", userSchema);
