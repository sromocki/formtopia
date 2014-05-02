define(['base','hbs!./form_builder_footer'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
      'click button' : 'handleUrl',
    },
    handleUrl : function(e){
      this.model.set('isDraft',false);
      var url = $(e.currentTarget).attr('href');
      var rawLink = $(e.currentTarget).attr('data-raw');
      if ((!rawLink) && url && url[0] != '#' && (url.indexOf('http') !== 0) && (url.indexOf('mailto') !== 0)){
        window.bamfrouter.navigate(url, { trigger : true });
        e.preventDefault();
      }
    },
  });
});
