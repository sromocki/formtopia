define(['base'],function(Base){
  return Base.Router.extend({
    routes : {
      'landing/:action' : 'landingRoute',
      '' : 'defaultRoute',
      ':controller' : 'defaultRoute',
      ':controller/:action' : 'defaultRoute',
      ':controller/:action/:id' : 'defaultRoute',
      'guest/:controller/:action/:id' : 'guestOnly',
    },
    initialize : function(){
      this.mediator.subscribe('navigate', function(params){
        this.navigate(params.url, params.opts);
      }, this);
    },
    defaultRoute : function(controller, action, id){
        if(!window.currentUser){
          controller = 'landing';
          action = null;
          id = null;
        }
        this.mediator.publish('go',{
          controller : controller || 'landing',
          action : action || 'index',
          id : id,
        });
    },
    landingRoute : function(action){
      this.mediator.publish('go',{
        controller : 'landing',
        action : action
      });
    },
    guestOnly : function(controller, action, id){
      this.mediator.publish('go',{
        controller : controller || 'landing',
        action : action,
        id : id,
      });
    },
  });
});
