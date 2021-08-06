const LocalStrategy = require("passport-local");
const { Strategy } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/users.models");

module.exports = function configPassport(passport) {
  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      let json = { success: false, data: null, error: null };
      //   const { username, password } = req.body;
      console.log(username, password);
      //   login function starts here
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
                uuid: user.uuid,
              },
            };
          } else {
            json = { ...json, error: "Invalid username or password" };
          }
        } else {
          json = { ...json, error: "INVALID USERNAME OR PASSWORD" };
        }
      } catch (err) {
        json = { ...json, error: "Something went wrong?" };
      } finally {
        console.log(json);
        // return json;
        if (json.error) {
          return done(json.error);
        }
        const token = jwt.sign(
          { uuid: json.data.uuid },
          process.env.SECRET_KEY,
          {
            expiresIn: "10 minutes",
          }
        );
        return done(null, { username: json.data.username }, { token });
      }
      //   login function ends here
    })
  );

  const cookieJWTExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  };

  const jwtOptions = {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: cookieJWTExtractor,
  };

  passport.use(
    "jwt",
    new Strategy(jwtOptions, async (payload, done) => {
      if (!payload || !payload.uuid) {
        return done(true, false, "INVALID CREDENTIALS");
      }
      const { data, error } = await User.findOne(payload.uuid);
      if (error) {
        return done(true, false, "invalid credentials");
      }
      return done(false, data, null);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
};

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
