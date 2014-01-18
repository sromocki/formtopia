define(['base','hbs!./form'],function(Base,tmpl){
  return Base.ItemView.extend({
    template : tmpl,
  });
});