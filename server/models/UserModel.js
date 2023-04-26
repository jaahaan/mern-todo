const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
// const Schema = mongoose.Schema

// const UserSchema = new Schema({
//     username : {
//         type: String,
//         required : true,
//         unique: false
//     },
//     email: {
//         type: String,
//         required : true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         unique : false,
//     },
// });

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.register = async function (username, email, password) {
  //validation
  if (!username || !email || !password) {
    throw Error("All fields are required!!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email!!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!!");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exist!!");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields are required!!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email doesn't exist!!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password!!");
  }

  return user;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
