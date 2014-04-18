var mongoose = require('mongoose');
var field = require('./entry_field');
var schema = new mongoose.Schema({
  form_id : String,
  fields : [field],
  created : { type : Date, default : Date.now },
});
module.exports = mongoose.model('Entry', schema);
