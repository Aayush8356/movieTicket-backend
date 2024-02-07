const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//// Register DESC

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All field are mandatory!");
  }
  const availableUserName = await Users.findOne({ email });
  if (availableUserName) {
    res.status(400);
    throw new Error("Email Address already exists!");
  }
  const encrypt = await bcrypt.hash(password, 10);
  const user = await Users.create({
    username: username,
    email: email,
    password: encrypt,
  });
  if (user) {
    res.status(200).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    res.json("User Data is not valid");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.json("Enter registerd email address and password");
  }
  const user = await Users.findOne({ email }); // from stored collections
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.json({ accessToken });
  } else {
    return res
      .status(401)
      .json({ meassage: "Invalid email address or password" });
  }
});

/// CURRENT USER DESC

const meUser = async (req, res) => {
  const _user = req.user;
  if (!_user) {
    res.status(400);
    return { error: "Token has been expired!" };
  }
  const { id } = _user;
  const user = await Users.findById(id);
  if (!user) {
    res.status(400);
    return { error: "user not found" };
  }
  res.status(200).json(user);
};

// const currentUser = asyncHandler(async (req, res) => {
//   const user = await Users.findById(req.params.id);
//   const { username, email } = user;
//   res.status(200).json({ username, email });
// });

module.exports = { registerUser, loginUser, meUser };
