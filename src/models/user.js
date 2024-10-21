const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  phone_no: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  img: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  password: {
    type: String,
    required: true
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login
userSchema.statics.login = async function(phone_no, password) {
  const user = await this.findOne({phone_no});
  if (user) {
    // compare password
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error('Incorrect Password')
  }
  throw new Error('Incorrect phone number or password')
  
}

const User = mongoose.model("user", userSchema);
module.exports = User;