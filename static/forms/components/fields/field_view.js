define(['base','./model','hbs!./field'],function(Base,Field,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
    	'click .remove-field-btn' : 'removeField',
    },
    initialize: function(){
    	this.mediator.on('fieldAdded',this.fieldAdded,this);
    	this.mediator.on('fieldRemoved',this.fieldRemoved,this);
    },
    removeField : function(){
    	this.mediator.publish('removeField',{field: this.model});
    	this.close();
    },
    fieldRemoved : function(params){
    	if(this.model.get('row_index') >= params.row_index){
    		if(this.model.get('field_index') > params.field_index){
    			this.model.set('field_index',this.model.get('field_index')-1);
    			this.render();
    		} 
    	}
	},
	fieldAdded : function(params){
    	if(this.model.get('row_index') > params.row_index){
    		this.model.set('field_index',this.model.get('field_index')+1);
    		this.render();
    	}
    },
  });
});