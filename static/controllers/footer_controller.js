define(['base','../footer/view','jquery'],function(Base,FooterView,$){
  return Base.Controller.extend({
    name : 'footer',
    initialize : function(){
      _.defer(_.bind(this.mediator.publish,this.mediator,'go',{
        controller : this.name,
      }));
    },
    index : function(){
      var user = new Base.Model(window.currentUser) || new Base.Model();

      return new FooterView({model : user});
    },
    logout : function(){
      $.ajax({
        url: '/session/logout',
        type : 'GET',
      });

    },
  });
});
