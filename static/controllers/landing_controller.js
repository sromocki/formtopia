define(['base','../landing/view','../landing/login_view', '../landing/create_user_view'],function(Base, LandingView, LoginView, CreateUserView){
  return Base.Controller.extend({
    name : 'landing',
    index : function(){
      return new LandingView();
    },
    login : function(){
      return new LoginView();
    },
    create_user : function(){
      return new CreateUserView();
    }
  });
});
