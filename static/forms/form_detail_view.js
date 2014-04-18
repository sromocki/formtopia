define(['base','hbs!./form_detail'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    className : 'list-group-item',
    tagName : 'li',
    events : {
    	'click .delete-form' : 'deleteForm',
      'click .create-link' : 'showLink'
    },
    deleteForm : function(){
    	this.model.destroy();
    },
    showLink : function(){
      this.$('.link-created').removeClass('hide');
      var link = "http://localhost:9000/guest/forms/entry/"+this.model.id+"/"+this.model.get("token");
      this.$('input[name="create-link"]').val(link);
    }

  });
});
