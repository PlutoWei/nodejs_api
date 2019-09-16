/**
 * /models/user.js contains the mongoose model for a user.
 * A user contains username, password, email, firstName, and lastName.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




//

var inventorySchema = new Schema({
  product_name : { type: String, min: 0, max: 300},
  product_image : { type: String, min: 0, max: 100000},
  product_description : { type: String, min: 0, max: 50},
  product_category : { type: String, min: 0, max: 100},
  product_price : { type: String, min: 0, max: 5000000},
  stock_number : { type: String, min: 0, max: 50},
  item_supplier : { type: String},
  supplier_name : { type: String, min: 0, max: 100},
  supplier_email : { type: String, min: 0, max: 100},
  supplier_number : { type: String, min: 0, max: 500},
  is_available : { type: String, min: 0, max: 500}
  
});

var Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;