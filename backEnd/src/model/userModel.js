const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const product = require("./productModel");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pls enter the name"],
  },
  email: {
    type: String,
    required: [true, "pls enter the email"],
    lowercase: true,
    validate: [validator.isEmail, "pls enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "pls enter password"],
    select: false,
  },

  confirmPassword: {
    type: String,
    select: false,
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "password & confirm password does not match!",
    },
  },
  wishlist:[{
    type:mongoose.Schema.ObjectId,ref:"product"
  }]
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confrmPassword = undefined;
  next();
});

userSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd,pswdDB);
};

const user = mongoose.model("user", userSchema);

module.exports = user;
