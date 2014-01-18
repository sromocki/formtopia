define(['base','hbs!./form_detail'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
  });
});