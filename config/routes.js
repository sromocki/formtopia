module.exports = function(config) {
	var app = config.app;
	var users = config.services.users;
	var forms = config.services.forms;
	var passport = config.passport;

	var serveStatic = function(req,res){
		if(req.user){
			delete req.user['password'];
		}
		res.render('landing', { user : req.user && JSON.stringify(req.user)});
	};
	app.get('/',serveStatic);
	app.get('/forms*',serveStatic);
	app.get('/landing*',serveStatic);

	app.post('/api/login', function(req,res,next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.redirect('/'); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				res.user = user;
				return res.redirect('/#forms');
			});
		})(req, res, next);
	});

	app.get('/session/logout', function(req,res,next) {
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
