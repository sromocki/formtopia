define(['base','../header/view','jquery'],function(Base,HeaderView,$){
  return Base.Controller.extend({
    name : 'header',
    initialize : function(){
      _.defer(_.bind(this.mediator.publish,this.mediator,'go',{
        controller : this.name,
      }));
    },
    index : function(){
      var user = new Base.Model(window.currentUser) || new Base.Model();

      return new HeaderView({model : user});
    },
    logout : function(){
      $.ajax({
        url: '/session/logout',
        type : 'GET',
      });
    },
  });
});
