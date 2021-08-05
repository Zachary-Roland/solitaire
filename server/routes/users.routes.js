const express = require("express");
const router = express.Router();
const User = require("../models/users.models");

// routes I want

// find user by username

// create user

router.post("/login", async (req, res) => {
  let json = { success: false, data: null, error: null };
  const { username, password } = req.body;
  console.log(username, password);
  try {
    if (validate(username, password)) {
      let user = await User.findOne({ username });
      if (user && user.validPassword(password)) {
        json = {
          ...json,
          success: true,
          data: {
            username: user.username,
            email: user.email,
            highscore: user.highscore,
          },
        };
      }
    } else {
      json = { ...json, error: "Invalid username or password" };
    }
  } catch (err) {
    json = { ...json, error: "Something went wrong?" };
  } finally {
    console.log(json);
    return res.send(json);
  }
});

router.post("/signup", async (req, res) => {
  let json = { success: false, data: null, error: null };
  const { username, password, email } = req.body;
  console.log(username, password, email);
  try {
    if (validate(username, password)) {
      let user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        if (validate(username, password)) {
          let hashed = await User.generateHash(password);
          let user = await User.create({ username, password: hashed, email });
          await user.save();
          json = { ...json, success: true, data: "Account Created!" };
        }
      } else {
        json = { ...json, error: "username already taken" };
      }
    }
  } catch (err) {
    console.log(err);
    json = { ...json, error: "SOMETHING WENT WRONG" };
  } finally {
    return res.send(json);
  }
});

// ! validate function checks if meets length requirements
function validate(username, password) {
  return (
    username &&
    username.length >= 4 &&
    username.length <= 20 &&
    password &&
    password.length >= 4 &&
    password.length <= 20
  );
}

module.exports = router;
