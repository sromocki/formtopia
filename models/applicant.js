var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  first_name : String,
  middle_name : String,
  last_name : String,
  birth : Date,
  positions : [ { start : Date, end : Date, title : String, description : String, company : String } ],
  skills : [String],
  credentials : [String],
  comments :[ { author : mongoose.Schema.Types.ObjectId, text : String } ], 
  created : { type : Date, default : Date.now },
});
module.exports = mongoose.model('Applicant', schema);
