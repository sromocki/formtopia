define(['base','hbs!./field','modelbinder'],function(Base,tmpl,ModelBinder){
  return Base.ItemView.extend({
    template : tmpl,
    className : 'field',
    tagName : 'li',
    events : {
        'click' : 'selectField'
    },
    modelEvents: {
        "change": "fieldModified"
    },
    initialize: function(){
        this.modelBinder = new ModelBinder();
    },
    onRender: function(){
        this.modelBinder.bind(this.model, this.el);
    },
    selectField : function(e){
        this.mediator.publish('fieldSelected',{model:this.model});
        this.$el.addClass('selected');
    },
    fieldModified : function(){
        this.trigger('fieldModified',this.model);
        this.render();
    }

  });
});
