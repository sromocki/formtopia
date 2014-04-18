var mongoose = require('mongoose');
var field = require('./field');
var schema = new mongoose.Schema({
  form_name : String,
  form_owner : String,
  form_tags : String,
  fields : [field],
  created : { type : Date, default : Date.now },
  isDraft : Boolean,
  userId : String,
  token: String
});
module.exports = mongoose.model('Form', schema);
