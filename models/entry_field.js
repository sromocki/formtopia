var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  field_name: String,
  value: String,
});
module.exports = schema;
