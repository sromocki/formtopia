define(['base','./model'],function(Base,Field){
  return Base.Collection.extend({
    model : Field,
    url : 'fields',
  });
});
