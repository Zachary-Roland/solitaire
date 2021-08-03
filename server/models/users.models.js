import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = mongoose.Schema({
  local: {
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    highscore: Number,
  },
  jwthash: { type: String },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.sanitize = function () {
  return {
    _id: this._id,
    username: this.local.username,
    email: this.local.email,
    highscore: this.local.highscore,
  };
};

export default mongoose.model("User", userSchema);

// password Hasher anytime password is changed
// userSchema.pre('save', function(next){
//     if(!this.isModified('local.password')){
//       return next();
//     }
//       this.local.password = this.generateHash(this.local.password);
//       this.jwthash = crypto.randomBytes(20).toString('hex');
//     return next();
//   });

// const userInfoSchema = new Schema({
//   username: String,
//   password: String,
//   email: String,
//   highscore: Number,
// });

// const userInfo = mongoose.model("userInfo", userInfoSchema);
