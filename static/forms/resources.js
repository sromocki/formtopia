define(['need','./collection','./model'],function(need, Forms, Form){
  need.registerResource('forms',need.Resource.extend({
    initialize : function(id){
      this.fetchable = id ? new Form({ _id : id }) : new Forms();
    },
    invalidate : function(){
      this.fetched = false;
    },
    produceResult : function(){
      if (this.fetched){
        return this.fetchable;
      }
      var def = need.Q.defer();
      this.fetchable.fetch()
        .then(_.bind(function(){
          this.fetched = true;
          def.resolve(this.fetchable);
          },this))
        .fail(def.reject);
     return def.promise;
    },
  }));
});
