define(['base','hbs!./login'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
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
  });
});
