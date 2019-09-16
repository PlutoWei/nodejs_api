var mongoose = require('mongoose');
var Schema = mongoose.Schema;




//

var ReceivingSchema = new Schema({
  inventory_id : { type: String, min: 0, max: 5000},
  quantity : { type: Number, min: 0, max: 1000000},
  unit : { type: String, min: 0, max: 5000},
  price_per_unit : { type: String, min: 0, max: 5000},
  additional_cost_acquisition : { type: String, min: 0, max: 5000},
  taxes : { type: String, min: 0, max: 5000},
  receiving_date : { type : Date},
  notes : { type: String, min: 0, max: 5000},
  stat : { type: String, min: 0, max: 5000, default : 'available'}
});

var Receiving = mongoose.model('Receiving', ReceivingSchema);

module.exports = Receiving;