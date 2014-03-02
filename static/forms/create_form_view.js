define(['base',
  'hbs!./create_form',
  './model',
  './components/fields/collection',
  './components/fields/model',
  './components/fields/fields_view',
  './components/fields/field_settings_view',
  'modelbinder',
  '../libs/gridster/dist/jquery.gridster'
  ],function(Base, tmpl, Form, Fields, FieldModel, FieldsView, FieldSettingsView, ModelBinder, gridster){
  return Base.ItemView.extend({
    template : tmpl,
    ui : {
      fieldContainer: '.field-container',
    },
    events : {
      'submit form' : 'saveForm',
      'click .add-field' : 'addField',
    },
    max_cols: 10,
    initialize : function(){
      this.model = new Form();
      this.modelBinder = new ModelBinder();
      this.collection = new Fields();
    },
    onRender: function(){
       this.modelBinder.bind(this.model, this.el);
       this.addField();
    },
    renderFieldsView : function(){
       this.fieldsView = new FieldsView({collection:this.collection});
       this.ui.fieldContainer.append(this.fieldsView.el);
       this.fieldsView.render();
       _.defer(_.bind(function(){
       this.gridster = this.$('.gridster').gridster({
           widget_margins: [10, 10],
           widget_base_dimensions: [90, 65],
           max_cols: this.max_cols,
           serialize_params : _.bind(this.serializeWidget,this),
           draggable : {
              stop  : _.bind(this.updateWidgets,this),
              handle : ".form-group"
           },
           resize: {
              stop: _.bind(this.updateWidgets, this),
              enabled: true,
              handle_class: 'widget-resize',
              //handle_append_to: 'widget-resize',
           }
         }).data('gridster');
       },this));
    },
    addField : function(){
      var fieldModel = new FieldModel();
      var position = this.nextAvailablePosition(this.collection);
      fieldModel.set("position", position);
      this.collection.add(fieldModel);
      if(this.fieldSettingsView){
         this.fieldSettingsView.remove();
      }
      this.fieldSettingsView = new FieldSettingsView({model:fieldModel});
      this.$('.field-settings').append(this.fieldSettingsView.el);
      this.fieldSettingsView.render();
      if(this.fieldsView){
        this.fieldsView.close();
      }
      this.renderFieldsView();
    },
    saveForm : function(e){
      e.preventDefault();
      this.model.set('fields',this.collection.toJSON());
      this.model.save();
    },
    serializeWidget : function($el, coord){
      return {
          id : $el.attr('data-widget-id'),
          position : _.omit(coord,'el')
      };
    },
    updateWidgets : function(){
      var updatedWidgets = this.gridster.serialize();
      _.each(updatedWidgets, _.bind(function(widget){
        var widgetModel = this.collection.get(widget.id);
        widgetModel.set('position',widget.position);
      },this));
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
