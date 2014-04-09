module.exports = function(config) {
	var app = config.app;
	var users = config.services.users;
	var forms = config.services.forms;
	var passport = config.passport;

	app.get('/',function(request,response){
  	response.render('landing');
	});
	app.get('/forms',function(request,response){
		response.render('landing');
	});
	app.post('/api/login', passport.authenticate('local', { successRedirect: '/#forms/form_builder',
	                                   				             failureRedirect: '/' }));
	app.get('/api/logout', forms.index);
	app.post('/api/user', users.create);

	app.get('/api/forms', forms.index);
	app.get('/api/forms/:id',forms.getForm);
	app.put('/api/forms/:id',forms.updateForm);
	app.delete('/api/forms/:id',forms.deleteForm);
	app.post('/api/forms',forms.create);

};
