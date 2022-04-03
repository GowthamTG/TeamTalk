// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// userSchema.plugin(passportLocalMongoose);

// const User = mongoose.model("User", userSchema);

// module.exports = User;

// Importing modules

const mongoose = require("mongoose");
var crypto = require("crypto");

// Creating user schema
// const UserSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   hash: String,
//   salt: String,
// });

// UserSchema.methods.setPassword = (password) => {
//   this.salt = crypto.randomBytes(16).toString("hex");
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
//     .toString(`hex`);
// };

// UserSchema.methods.validPassword = (password) => {
//   var hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
//     .toString(`hex`);
//   return this.hash === hash;
// };

// const User = (module.exports = mongoose.model("User", UserSchema));
