define(['base'],function(Base){
  return Base.Model.extend({
  	idAttribute : '_id',
    defaults : {
    	"type" : "text",
    	"typeLabel" : "Text Box",
    }
  });
});
