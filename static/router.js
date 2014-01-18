define(['base'],function(Base){
  return Base.Router.extend({
    routes : {
      '' : 'defaultRoute',
      ':controller' : 'defaultRoute',
      ':controller/:action' : 'defaultRoute',
      ':controller/:controller/:id' : 'defaultRoute',
    },
    defaultRoute : function(controller, action, id){
      this.mediator.publish('go',{
        controller : controller || 'landing',
        action : action,
        id : id,
      });
    },
  });
});
