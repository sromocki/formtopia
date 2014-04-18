define(['base'],function(Base){
  return Base.Router.extend({
    routes : {
      '' : 'defaultRoute',
      ':controller' : 'defaultRoute',
      ':controller/:action' : 'defaultRoute',
      ':controller/:action/:id' : 'defaultRoute',
      'guest/:controller/:action/:id' : 'guestOnly'
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
    guestOnly : function(controller, action, id){
      this.mediator.publish('go',{
        controller : controller || 'landing',
        action : action,
        id : id,
      });
    }
  });
});
