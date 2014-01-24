define(['base','./model','hbs!./field'],function(Base,Field,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
    	'click .remove-field-btn' : 'removeField',
    },
    initialize: function(){
    	this.mediator.on('fieldsAdded',this.fieldsAdded,this);
    	this.mediator.on('fieldsRemoved',this.fieldsRemoved,this);
    },
    removeField : function(){
    	this.mediator.publish('removeField',{field: this.model});
    	this.close();
    },
    fieldsRemoved : function(params){
    	if(this.model.get('row_index') >= params.row_index){
    		if(!params.field_index || this.model.get('field_index') > params.field_index){
    			this.model.set('field_index',this.model.get('field_index')-params.fieldsRemoved);
    			this.render();
    		} 
    	}
	},
	fieldsAdded : function(params){
    	if(this.model.get('row_index') > params.row_index){
    		this.model.set('field_index',this.model.get('field_index')+params.fieldsAdded);
    		this.render();
    	}
    },
  });
});