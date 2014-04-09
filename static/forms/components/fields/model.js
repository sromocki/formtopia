define(['base'],function(Base){
  return Base.Model.extend({
  	idAttribute : '_id',
    urlRoot : 'api/fields',
    defaults : {
    	"type" : "text",
    	"typeLabel" : "Text Box",
    }
  });
});
