define(['base','hbs!./field_settings','modelbinder', '../../../libs/bootstrap/js/dropdown'],function(Base,tmpl,ModelBinder,dropdown){
  return Base.ItemView.extend({
    template : tmpl,
    ui : {
    	"dropdownChoices" : "ul .dropdown-menu li"
    },
    events : {
    	"click @ui.dropdownChoices" : "selectType",
        "click .remove-field" : "removeField"
    },
    initialize: function(){
        this.modelBinder = new ModelBinder();
    },
    onRender: function(){
        this.modelBinder.bind(this.model, this.el);
    },
    selectType : function(e){
    	var type = e.currentTarget.attributes[0].value;
    	var typeLabel = e.currentTarget.innerText;
    	this.model.set("type",type);
    	this.model.set("typeLabel",typeLabel);
    	this.render();
    },
    removeField : function(e){
        this.mediator.publish('fieldRemoved', {model:this.model}, this);
        this.close();
    }

  });
});