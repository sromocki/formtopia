define(['backbone'],function(Backbone){
  var Mediator = function(){
  };
  _.extend(Mediator.prototype,Backbone.Events);
  Mediator.prototype.publish = Mediator.prototype.trigger;
  Mediator.prototype.subscribe = Mediator.prototype.on;
  return (new Mediator());
});
