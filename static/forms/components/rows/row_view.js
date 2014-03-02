define(['base','./model','hbs!./row','../fields/fields_view','../fields/model'],function(Base,Row,tmpl,FieldsView,Field){
  return Base.ItemView.extend({
    template : tmpl,
    defaultFieldCount : 3,
    events : {
    	'click .add-field-btn' : 'addField',
    	'click .remove-row-btn' : 'removeRow'
    },
    ui : {
      FieldViews : '.fields'
    },
    initialize: function(){
      this.collection = this.model.get('fields');
      this.mediator.on('removeField',this.removeField,this);
    },
    onRender: function(){
       var field_index = this.collection.length;
       _(this.defaultFieldCount).times(function(n){
       	   this.addField();
       },this);

       var fieldsView = new FieldsView({collection:this.collection, field_index: field_index});
       this.ui.FieldViews.append(fieldsView.el);
       fieldsView.render();
    },
    addField: function(){
      var fieldModel = new Field();
      this.collection.add(fieldModel);

      if(this.$('.field.visible').length === 6){
      	this.$('.add-field-btn').hide();
      }
    },
    removeField: function(params){
      if(this.$('.field.visible').length < 7){
        this.$('.add-field-btn').show();
      }
    },
    removeRow: function(){
    	this.mediator.publish('rowRemoved',{row:this.model});
    },
  });
});