const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const User = require("../models/users.models");
const passport = require("passport");
const auth = require("../middleware/auth.middleware");

router.get("/validate", auth, (req, res) => {
  return res.send({
    success: true,
    error: null,
    data: { username: req.user.username },
  });
});

router.post("/login", async (req, res) => {
  //! passport local-login goes here
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return res.send({ success: false, error: err, data: null });
    }
    return res
      .cookie("jwt", info.token, { secure: true, httpOnly: true })
      .send({ success: true, error: null, data: user });
  })(req, res);
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
          let hashed = await bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(),
            null
          );
          const uuid = uuidv4();
          //   User.generateHash(password);
          let user = await User.create({
            username,
            password: hashed,
            email,
            uuid,
          });
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

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.send({ success: true, error: null, body: null });
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
