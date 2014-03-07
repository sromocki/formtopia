define(['base','hbs!./form_manager','./form_details_view'],function(Base,tmpl,FormDetailsView){
  return Base.ItemView.extend({
  	template : tmpl,
  	ui : {
  		formContainer : '.form-container'
  	},
  	onRender : function(){
  	   this.formsView = new FormDetailsView({collection:this.collection});
       this.ui.formContainer.append(this.formsView.el);
       this.formsView.render();
  	}
  });
});