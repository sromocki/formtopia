var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var SALT_WORK_FACTOR = 10;
var user = mongoose.Schema({
  access_key : String,
  username : String,
  password : String,
  email : String,
  first_name : String,
  last_name : String,
  created : { type : Date, default : Date.now },
});
user.pre('save',function(next){
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            // Set access key
            if (user.isNew){
                user.access_key = uuid.v4();
            }
            next();
        });
    });
});
user.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
})
user.methods.checkPassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('Users',user);
