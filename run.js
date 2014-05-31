var express = require('express');
exp_hbs = require('express3-handlebars'),
passport = require('passport'),
LocalStrategy = require('passport-local'),
User = require('./models/user'),
nodemailer = require('nodemailer');

var users = require('./services/user_service');
var forms = require('./services/form_service');
var app = express();

app.configure('development', function() {
//   // live reload script

  var tinylr = require('tiny-lr');

  // standard LiveReload port
  var port = 35729;

  // tinylr(opts) => new tinylr.Server(opts);
  tinylr().listen(port, function() {
    console.log('... Listening on %s ...', port);
  })
  var liveReloadPort = 35729;
  var excludeList = ['.woff', '.flv'];
  
  app.use(require('connect-livereload')({
    port: liveReloadPort,
    excludeList: excludeList
  }));

  require('./watcher')();
});

require('mongoose').connect(process.env.MONGO_URL || 'mongodb://localhost/test');
app.engine('hbs', exp_hbs({defaultLayout: 'main', extname : '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.errorHandler({
  dumpExceptions: true,
  showStack: true
}));
app.use(express.json());
app.use(express.urlencoded());
app.use('/static',express.static(__dirname + '/static'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'form bliss' }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Local Strategy
// This will check to see if the user exists in the database
// If it doesn't then it will return false instead of a user object
// Which should cause the failure redirect path

passport.use(new LocalStrategy(
    function(username, password, done){
    User.findOne({username : username},function(err,user){
        if (err){ return done(err); }
        if (!user) { return done(null,false);}
        user.checkPassword(password,function(err,match){
            if (err) { return done(err); }
            if (!match){ return done(null,false); }
            done(null,user);
        });
    });
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,null,{lean : true }, done);
});

var config = {
  app: app,
  passport: passport,
  services: {
    users: users,
    forms: forms,
  },
};

require('./config/routes') (config);

app.listen(process.env.PORT || 9000);


