define(['base','hbs!./form_manager','./form_details_view'],function(Base,tmpl,FormDetailsView){
  return Base.ItemView.extend({
  	template : tmpl,
  	ui : {
  		formContainer : '.form-container'
  	},
    events : {
      'click a' : 'handleUrl',
    },
    handleUrl : function(e){
      var url = $(e.currentTarget).attr('href');
      var rawLink = $(e.currentTarget).attr('data-raw');
      if ((!rawLink) && url && url[0] != '#' && (url.indexOf('http') !== 0) && (url.indexOf('mailto') !== 0)){
        window.bamfrouter.navigate(url, { trigger : true });
        e.preventDefault();
      }
    },
  	onRender : function(){
  	   this.formsView = new FormDetailsView({collection:this.collection});
       this.ui.formContainer.append(this.formsView.el);
       this.formsView.render();
  	}
  });
});
