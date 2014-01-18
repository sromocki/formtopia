var mongoose = require('mongoose');
var user = mongoose.schema({
  name : { first : String, middle : String, last : String },
  access : String,
  username : String,
  encryptedPassword : String,
});
module.exports = mongoose.model('Users',user);
