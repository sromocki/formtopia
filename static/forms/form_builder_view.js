define(['base',
  'hbs!./form_builder',
  './model',
  './components/fields/collection',
  './components/fields/model',
  './components/fields/fields_view',
  './components/fields/field_settings_view',
  'modelbinder',
  '../libs/gridster/dist/jquery.gridster',
  './form_builder_footer_view'
  ],function(Base, tmpl, Form, Fields, FieldModel,
  FieldsView, FieldSettingsView, ModelBinder, gridster, FormBuilderFooterView){
  return Base.ItemView.extend({
    template : tmpl,
    max_cols: 10,
    ui : {
      fieldContainer: '.field-container',
      formBuilderFooter: '.form-builder-footer'
    },
    events : {
      'submit form' : 'finalForm',
      'click .add-field' : 'addField',
      'click .create-form-btn' : 'createForm',
    },
    initialize : function(){
      this.model.set('isDraft',true);
      this.model.on('change',this.saveForm,this);
      this.model.get('fields').on('remove',this.saveForm,this);
      this.mediator.subscribe('fieldModified',this.saveForm,this);
      this.mediator.subscribe('fieldSelected',this.selectField,this);
      this.mediator.subscribe('saveForm', this.saveForm,this);
      this.modelBinder = new ModelBinder();
    },
    onRender: function(){
       this.modelBinder.bind(this.model, this.el);
       _.defer(_.bind(function(){
        this.renderFieldsView();
        this.renderFooterView();
       },this));
    },
    renderFieldsView : function(){
      if(this.fieldsView){
        this.fieldsView.close();
        delete this.fieldsView;
      }
      this.fieldsView = new FieldsView({collection:this.model.get('fields')});

      this.fieldsView.on("field:fieldModified",_.bind(function(childView,model){
        this.saveForm(model);
      },this));

      this.ui.fieldContainer.append(this.fieldsView.el);
      this.fieldsView.render();
    },
    renderFooterView : function(){
       if(this.formBuilderFooterView){
          this.formBuilderFooterView.close();
          delete this.formBuilderFooterView;
       }
       this.formBuilderFooterView = new FormBuilderFooterView({model: this.model});
       this.ui.formBuilderFooter.append(this.formBuilderFooterView.el);
       this.formBuilderFooterView.render();
    },
    refreshFieldSettingsView : function(model){
      if(this.fieldSettingsView){
         this.fieldSettingsView.remove();
         delete this.fieldSettingsView;
      }
      this.fieldSettingsView = new FieldSettingsView({model:model});
      this.$('.field-settings').append(this.fieldSettingsView.el);
      this.fieldSettingsView.render();
    },
    addField : function(){
      var fieldModel = new FieldModel();
      var position;
      if(this.model.get('fields').length === 0){
        position = {
          col: 1,
          row: 1,
          size_x: 2,
          size_y: 1,
        };
      } else {
        position = this.nextAvailablePosition(this.model.get('fields'));
      }
      fieldModel.set("position", position,{silent:true});
      this.model.get('fields').add(fieldModel);
      this.saveForm(fieldModel);
    },
    finalForm : function(e){
      e.preventDefault();
    },
    saveForm: function(fieldSelected){
      this.model.save(null,{
        success: _.bind(function(model){
          this.model.set('fields',model.get('fields'),{silent:true});
          this.renderFieldsView();
          this.renderFooterView();
          if(fieldSelected && fieldSelected.get('itemIndex') !== undefined){
            var fieldModel = this.model.get('fields').findWhere({itemIndex:fieldSelected.get('itemIndex')});
            _.defer(_.bind(function(){this.selectField({model:fieldModel})},this));
          }
        },this),
      }).then(_.bind(function(){
        this.need.invalidateResource('forms');
      },this));
    },
    selectField : function(params){
      this.refreshFieldSettingsView(params.model);
      this.$('.field').removeClass('selected');
      _.each(this.fieldsView.children._views, function(view){
        if(view.model.get('itemIndex') === params.model.get('itemIndex')){
          view.$el.addClass('selected');
        }
      });
    },
    nextAvailablePosition : function(widgets){
          var positions = widgets.pluck('position');
          var positionsUsed = [];
          _.times(this.max_cols, function(n){
              positionsUsed.push([]);
          }, this);
          _.each(positions, function(position){
            for(var r=position.row; r < position.row + position.size_y; r++){
              for(var c=position.col; c < position.col + position.size_x; c++){
                positionsUsed[c - 1][r - 1] = true;
              }
            }
          });
          for(var r=0;; r++){
            for(var c=0; c < positionsUsed.length; c++){
              if(positionsUsed[c][r] != true){
                return position = {col:c+1 ,row:r+1,size_x:2,size_y:1};
              }
            }
          }
      },

  });
});
