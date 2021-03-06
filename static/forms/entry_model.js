define(['base','./components/fields/entry_fields'],function(Base, Fields){
  return Base.Model.extend({
    urlRoot : '/api/entry',
    idAttribute: "_id",
    defaults : {
      "fields" : new Fields(),
    },
    parse : function(response, options){
      var fields = this.get('fields');
      if(fields){
        if(fields instanceof Array){
          this.set('fields', new Fields(response.fields));
        }
          this.get('fields').set(response.fields, { silent : true });
       response.fields = this.get('fields');
     }
       return response;
    },
    toJSON : function(){
      var json = Base.Model.prototype.toJSON.apply(this,arguments);
        if(json.fields instanceof Fields){
         json.fields = json.fields.toJSON();
        }
      return json;
    }
  });
});
