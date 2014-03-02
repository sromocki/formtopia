define(['base'],function(Base){
  return Base.Model.extend({
    urlRoot : 'fields',
    defaults : {
    	"type" : "text",
    	"typeLabel" : "Text Box"
    }
  });
});