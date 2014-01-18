define(['mario','backbone','base/model','base/controller','mediator','need'],
    function(Marionette, Backbone, Model, Controller, mediator, need){
  var Base = _.extend({},Backbone,Marionette, {
    Model : Model,
    Controller : Controller,
  });
  _.each(Base, function(v,k){
    if (typeof v == 'function'){
      v.prototype.mediator = mediator;
      v.prototype.need = need;
    }
  });
  return Base;
});
