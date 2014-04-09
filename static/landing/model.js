define(['base'],function(Base){
  return Base.Model.extend({
  	idAttribute : '_id',
    urlRoot : 'api/user',

  });
});
