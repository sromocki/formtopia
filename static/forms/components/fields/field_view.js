define(['base','hbs!./field','modelbinder'],function(Base,tmpl,ModelBinder){
  return Base.ItemView.extend({
    template : tmpl,
    className : 'field',
    tagName : 'li',
    // events : {
    //     'click .remove-field-btn' : 'removeField',
    // },
    initialize: function(){
        this.modelBinder = new ModelBinder();
        this.model.set('index',this.options.itemIndex);
        this.model.on('change',this.render,this);
    },
    onRender: function(){
        this.modelBinder.bind(this.model, this.el);
        $(this.el).attr('data-widget-id',this.model.cid);
    },

  });
});