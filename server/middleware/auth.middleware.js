const passport = require("passport");

async function auth(req, res, next) {
  passport.authenticate("jwt", (err, user, info) => {
    console.log(`err: ${err}, info: ${info}`);
    if (err || info) {
      return res.send({
        success: false,
        data: null,
        error: "iNvAlId cReDeNtIaLs",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = auth;
