define(['base','hbs!./field','modelbinder'],function(Base,tmpl,ModelBinder){
  return Base.ItemView.extend({
    template : tmpl,
    className : 'field',
    tagName : 'li',
    events : {
        'click' : 'selectField'
    },
    initialize: function(){
        this.modelBinder = new ModelBinder();
        this.model.on('change',this.render,this);
    },
    onRender: function(){
        this.modelBinder.bind(this.model, this.el);
    },
    selectField : function(e){
        this.mediator.publish('fieldSelected',{model:this.model});
        $(e.currentTarget).addClass('selected');
    },

  });
});