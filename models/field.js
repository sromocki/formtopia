var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  field_name: String,
  position: Object,
  string_value: String,
  max_char: String,
  placeholder: String,
  typeLabel: String,
  hide_label: Boolean,
  supportive_text: String,
  required: Boolean,
  unique: Boolean,
  type: String,
});
module.exports = schema;