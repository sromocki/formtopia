define(['base','hbs!./form_builder_footer'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
      'click .save-form-btn' : 'saveForm',
    },
    saveForm : function(e){
      this.model.set('isDraft',false);
    },
  });
});
