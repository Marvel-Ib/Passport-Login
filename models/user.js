const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const argon2 = require("argon2");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: String,
  googleId: String,
});

userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    if (await argon2.verify(this.password, password)) {
      return true;
      // password match
    } else {
      return false;
      // password did not match
    }
  } catch (err) {
    return false;
    // internal failure
  }
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
