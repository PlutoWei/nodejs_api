/**
 * /models/user.js contains the mongoose model for a user.
 * A user contains username, password, email, firstName, and lastName.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




//

var orderSchema = new Schema({
  username : { type: String, min: 5, max: 500},
  inventory_id : { type: String, min: 5, max: 50},
  quantity : { type: String},
  order_placed_date: { type: Date, default: Date.now },
  expected_delivery_date: { type: Date, default: Date.now },
  price_per_unit : { type: String,default: 0},
  order_status : { type: String, min: 0, max: 9999999 ,default: "added-to-cart"},
  payment_status : { type: String, min: 0, max: 9999999 ,default: "UNPAID"}
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;