define(['base','hbs!./template','./login_view','./create_user_view'],function(Base,tmpl,LoginView,CreateUserView){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
       'click .register-btn' : 'createUser',
       'click .login-btn' : 'loginUser'
    },
    createUser : function(){
    	this.$('.login-row, .register-row').addClass('hide');
    	this.createUserView = new CreateUserView();
    	this.$('.login-container').prepend(this.createUserView.el);
      this.createUserView.render();
    },
    loginUser : function(){
    	this.$('.login-row').addClass('hide');
    	this.loginView = new LoginView();
    	this.$('.login-container').prepend(this.loginView.el);
    	this.loginView.render();
    }
  });
});
