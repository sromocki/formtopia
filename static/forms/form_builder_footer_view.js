define(['base','hbs!./form_builder_footer'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
      'click button' : 'handleUrl',
    },
    handleUrl : function(e){
      this.model.set('isDraft',false);
      Base.ItemView.prototype.handleUrl.apply(this,arguments);
    },
  });
});
