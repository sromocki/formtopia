define(['base'],function(Base){
  return Base.Router.extend({
    routes : {
      '' : 'defaultRoute',
      ':controller' : 'defaultRoute',
      ':controller/:action' : 'defaultRoute',
      ':controller/:controller/:id' : 'defaultRoute',
    },
    defaultRoute : function(controller, action, id){
      if(window.currentUser){
        this.mediator.publish('go',{
          controller : controller || 'landing',
          action : action,
          id : id,
        });
      } else if (controller && controller !== "landing") {
        window.location.pathname = "/";
      } else {
        this.mediator.publish('go',{
          controller : controller || 'landing',
          action : 'index',
          id : id,
        });
      }
    },
  });
});
