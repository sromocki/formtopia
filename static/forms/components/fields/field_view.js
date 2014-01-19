define(['base','./model','hbs!./field'],function(Base,Field,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    initialize: function(){
    	var model = this.model;
    },
  });
});