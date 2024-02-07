const express = require("express");
const {
  loginUser,
  registerUser,
  meUser,
} = require("../controller/userController");

const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/me").get(validateToken, meUser);

module.exports = router;
