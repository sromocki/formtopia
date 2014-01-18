define(['base','./view'],function(Base,HeaderView){
  return Base.Controller.extend({
    name : 'header',
    initialize : function(){
      _.defer(_.bind(this.mediator.publish,this.mediator,'go',{
        controller : this.name,
      }));
    },
    index : function(){
      return new HeaderView();
    },
  });
});
