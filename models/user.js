/**
 * /models/user.js contains the mongoose model for a user.
 * A user contains username, password, email, firstName, and lastName.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//

var userSchema = new Schema({
  email: { type: String, min: 5, max: 50, unique: true },
  username: { type: String, min: 5, max: 50 },
  first_name: { type: String, min: 1, max: 50 },
  last_name: { type: String, min: 1, max: 50 },
  display_name: { type: String, min: 5, max: 50 },
  depositAddress: String,
  password: { type: String, min: 5, max: 50 },
  updated: { type: Date, default: Date.now },
  userType: { type: String, default: "customer" },
  referrer: { type: String, min: 5, max: 100 },
  withdrawal_type: { type: String, min: 5, max: 100 },
  withdrawal_address: { type: String, min: 5, max: 500 },
  user_status: { type: String, min: 5, max: 500, default: "active" },
  user_captcha: { type: String, min: 5, max: 500, default: "mycaptcha" },
  phone_number: { type: String, min: 5, max: 500 },
  extra_note: { type: String, min: 5, max: 5000 },
  country: { type: String, min: 5, max: 100 }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
