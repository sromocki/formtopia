define(['base','./view'],function(Base, LandingView){
  return Base.Controller.extend({
    name : 'landing',
    index : function(){
      return new LandingView();
    },
  });
});
