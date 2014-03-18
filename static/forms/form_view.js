define(['base',
		'hbs!./form',
		'./components/fields/fields_view',
		'../libs/gridster/dist/jquery.gridster'],function(Base,tmpl,FieldsView,gridster){
  return Base.ItemView.extend({
    template : tmpl,
    ui : {
      fieldContainer: '.field-container'
    },
    onRender : function(){
       $('.header').addClass('hide');
       this.fieldsView = new FieldsView({collection:this.model.get('fields')});
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