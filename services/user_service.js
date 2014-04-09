var User = require('../models/user');
var passport = require('passport');
module.exports = {
  create : function(request, response) {
  	var data = request.body;
    if (data.password != data.confirm){
        request.session.set('message','Check confirm password and password.');
        return response.redirect('/');
    }
    delete data.confirm;
    var user = new User(data);
    user.save(function(err){
      if (err){return response(err);}
  	  request.login(user,function(err){
          if (err){return response(err);}
          response.redirect('/#forms/form_builder');
  	  });
    });
  },
  logout : function(request, response){
  	request.logout();
    response.redirect('/');
  }
};
