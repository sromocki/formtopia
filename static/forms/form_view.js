define(['base',
		'hbs!./form',
		'./components/fields/collection',
		'./components/fields/fields_view',
		'../libs/gridster/dist/jquery.gridster'],function(Base,tmpl,Fields,FieldsView,gridster){
  return Base.ItemView.extend({
    template : tmpl,
    ui : {
      fieldContainer: '.field-container'
    },
    initialize : function(){
        this.collection = new Fields(this.model.get('fields'));
    },
    onRender : function(){
       $('.header').addClass('hide');
       this.fieldsView = new FieldsView({collection:this.collection});
       this.ui.fieldContainer.append(this.fieldsView.el);
       this.fieldsView.render();
       _.defer(_.bind(function(){
       this.gridster = this.$('.gridster').gridster({
           widget_margins: [10, 10],
           widget_base_dimensions: [90, 65],
         }).data('gridster');
       this.gridster.disable();
       },this));
    },
  });
});