define(['base','./model','hbs!./row','../fields/field_view','../fields/model'],function(Base,Row,tmpl,FieldView,Field){
  return Base.ItemView.extend({
    template : tmpl,
    defaultFieldCount : 3,
    fieldCount: 0,
    events : {
    	'click .add-field-btn' : 'addField',
    	'click .remove-row-btn' : 'removeRow'
    },
    initialize: function(){
    	this.mediator.on('removeField',this.removeField,this);
    	this.mediator.on('fieldsAdded',this.fieldAdded,this);
    	this.mediator.on('fieldsRemoved',this.fieldRemoved,this);
    },
    onRender: function(){
	   if(!this.model.get('field_index')){
       	   this.model.set('field_index',0);
   	   } 
       _(this.defaultFieldCount).times(function(n){
       	 this.model.set('field_index',this.model.get('field_index')+1);
         var fieldView = new FieldView({model: new Field({row_index:this.model.get('row_index'),field_index:this.model.get('field_index')})});
         fieldView.render();
         this.$('.fields').append(fieldView.el);
         this.fieldCount++;
       },this);
    },
    addField: function(){
      var new_field_index = this.model.get('field_index') + 1;
      this.model.set('field_index',new_field_index);
      var fieldView = new FieldView({model: new Field({row_index:this.model.get('row_index'),field_index:this.model.get('field_index')})});
      fieldView.render();
      this.mediator.publish('fieldsAdded',{row_index:this.model.get('row_index'),field_index:this.model.get('field_index'),fieldsAdded:1});
      this.$('.fields').append(fieldView.el);
      this.fieldCount++;
      if(this.fieldCount === 6){
      	this.$('.add-field-btn').hide();
      }
    },
    removeField: function(params){
    	if(params.field.get('row_index')===this.model.get('row_index')){
    		var new_field_index = this.model.get('field_index')-1;
    		this.mediator.publish('fieldsRemoved',{row_index:params.field.get('row_index'),field_index:params.field.get('field_index'),fieldsRemoved:1});
    		this.model.set('field_index',new_field_index);
    		this.fieldCount--;
    		if(this.fieldCount < 6){
    			this.$('.add-field-btn').show();
    		}
    	}
    },
    fieldAdded: function(params){
    	if(this.model.get('row_index') > params.row_index){
    		this.model.set('field_index',this.model.get('field_index')+1);
    	}
    },
    fieldRemoved: function(params){
    	if(this.model.get('row_index') > params.row_index){
    		this.model.set('field_index',this.model.get('field_index')-1);
    	}
    },
    removeRow: function(){
    	debugger;
    	this.mediator.publish('fieldsRemoved',{row_index:this.model.get('row_index'),fieldsRemoved:this.$('.field').length});
    	this.close();
    },
  });
});