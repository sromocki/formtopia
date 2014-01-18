define(['backbone'],function(Backbone){
  var Resource = function(){
    this.initialize();
  };
  _.extend(Resource.prototype,Backbone.Events,{
    deps : [],
    initialize : function(){},
    produceResult : function(){ return arguments[0]; },
  });
  Resource.extend = Backbone.View.extend;
  return Resource;
});
