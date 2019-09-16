var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regC = new Schema({
createAt : { type: Date, default: Date.now, expires : 7200}, 
captcha : { type: String, min: 10, max: 50}
});


var regCaptcha = mongoose.model('regCaptcha', regC);

module.exports = regCaptcha;