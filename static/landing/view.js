define(['base','hbs!./template'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
      'click .login-btn,.register-btn' : 'changeHeader',
    },
    changeHeader : function(){
      $('.main-header').addClass('header-signup');
    }
  });
});
