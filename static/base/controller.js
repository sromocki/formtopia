define(['backbone'],function(Backbone){
  var Controller = function(opts){
    this.$el = this.$el || (opts || {}).$el;
    this.setupListening();
    this.initialize.apply(this,arguments);
  };
  _.extend(Controller.prototype,Backbone.Events,{
    defaultAction : 'index',
    name : 'unnamed',
    getEl : function(){ return _.result(this,'$el'); },
    setupListening : function(){
      this.mediator.subscribe('go',function(params){
        params = params || {};
        if (params.controller != this.name) { return; }
        params.render = _.bind(this.render,this);
        var result = this[params.action || this.defaultAction](params);
        this.render(result);
      },this);
    },
    render : function(result){
      if (result instanceof Backbone.View){
        this.getEl().html(result.render().el);
      }
    },
    initialize : function(){
    },
  });
  Controller.extend = Backbone.View.extend;
  return Controller;
});
