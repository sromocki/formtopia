define(['base','header/controller','landing/controller','forms/controller','./view'],
    function(Base,HeaderController,LandingController,FormsController,MainView){
  return Base.Controller.extend({
    name : 'main',
    initialize : function(){
      new HeaderController({ $el : _.bind(this.$el.find,this.$el,'.header') });
      new LandingController({ $el : _.bind(this.$el.find,this.$el,'.content') });
      new FormsController({ $el : _.bind(this.$el.find,this.$el,'.content') });
    },
    index : function(){
      return new MainView();
    },
  });
});
