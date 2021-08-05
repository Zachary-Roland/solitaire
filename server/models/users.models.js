const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema({
  local: {
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    highscore: { type: Number, default: 0 },
  },
  jwthash: { type: String },
});

// Example functions from class notes
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

userSchema.methods.validPassword = async function (password) {
  let compare = await bcrypt.compareSync(password, this.local.password);
  return compare;
};

userSchema.methods.sanitize = function () {
  return {
    _id: this._id,
    username: this.local.username,
    email: this.local.email,
    highscore: this.local.highscore,
  };
};

module.exports = mongoose.model("User", userSchema);
