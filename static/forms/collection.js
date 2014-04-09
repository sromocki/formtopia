define(['base','./model'],function(Base,Form){
  return Base.Collection.extend({
    model : Form,
    url : 'api/forms',
  });
});
