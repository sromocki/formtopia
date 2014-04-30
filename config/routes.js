module.exports = function(config) {
	var app = config.app;
	var users = config.services.users;
	var forms = config.services.forms;
	var passport = config.passport;

	app.get('/',function(request,response){
  	response.render('landing', { user : request.user && JSON.stringify(request.user)});
	});
	app.get('/forms',function(request,response){
		response.render('landing');
	});
	app.post('/api/login', function(req,res,next) {
		passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err); }
	    if (!user) { return res.redirect('/'); }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
				res.user = user;
	      return res.redirect('/#forms/form_builder');
	    });
  	})(req, res, next);
	});

	app.get('/session/logout', function(req,res,next) {
		debugger;
		req.logout();
		res.redirect('/');
	});

	app.post('/api/user', users.create);

	app.get('/api/forms', forms.index);
	app.get('/api/forms/:id',forms.getForm);
	app.get('/guest/forms/entry/:id/:token',forms.getForm);
	app.put('/api/forms/:id',forms.updateForm);
	app.delete('/api/forms/:id',forms.deleteForm);
	app.post('/api/forms',forms.create);
	app.post('/api/entry',forms.create_entry);

};
