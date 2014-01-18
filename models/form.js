var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  form_name : String,
  form_owner : String,
  fields : [ {name: String, value: String } ],
  created : { type : Date, default : Date.now },
});
module.exports = mongoose.model('Form', schema);
