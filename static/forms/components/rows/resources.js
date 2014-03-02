define(['need','./collection'],function(need, Rows){
  need.registerResource('rows',need.Resource.extend({
    initialize : function(){
      this.collection = new Rows();
    },
    produceResult : function(){
      if (this.fetched){
        return this.collection;
      }
      var def = need.Q.defer();
      this.collection.fetch()
        .then(_.bind(function(){
          this.fetched = true;
          def.resolve(this.collection);
          },this))
        .fail(def.reject);
     return def.promise;
    },
  }));
});
