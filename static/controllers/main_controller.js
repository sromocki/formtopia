define(['base','./header_controller','./landing_controller','./forms_controller','../main/view'],
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
