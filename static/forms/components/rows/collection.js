define(['base','./model'],function(Base,Row){
  return Base.Collection.extend({
    model : Row,
    url : 'rows',
  });
});
