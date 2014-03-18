define(['base'],function(Base){
  return Base.Model.extend({
  	idAttribute : '_id',
    urlRoot : 'fields',
    defaults : {
    	"type" : "text",
    	"typeLabel" : "Text Box",
    }
  });
});