define(['base','hbs!./create_user'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
      'submit' : 'createUser',
    },
    createUser : function(){
      
    }

  });
});
