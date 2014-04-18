define(['base',
		'hbs!./form',
		'./components/fields/fields_view',
		'../libs/gridster/dist/jquery.gridster',
		'./components/fields/entry_field',
		'./entry_model'],function(Base,tmpl,FieldsView,gridster,EntryFieldModel,EntryModel){
  return Base.ItemView.extend({
    template : tmpl,
    ui : {
      fieldContainer: '.field-container',
    },
		events : {
			'click .submit-form-btn' : 'submitEntry'
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
		submitEntry : function(){
				if(this.options.isEntry){
					var entryModel = new EntryModel({form_id: this.model.id});
					var fields = this.model.get("fields");
					_.each(fields.models, function(field){
						var entryField = new EntryFieldModel({value:field.get("default_value"),field_name:field.get("field_name")});
						entryModel.get("fields").add(entryField);
					});

					entryModel.save();
				}
			}
  });
});
