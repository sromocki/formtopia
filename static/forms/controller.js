define(['base',
  './create_view',
  './index_view',
  './form_view',
  './resources'],function(Base,CreateView,IndexView,ShowView,Resources){
  return Base.Controller.extend({
      name : 'forms',
      index : function(params){
        this.need('forms').spread(function(forms){
          params.render(new IndexView({ collection : forms }));
        },function(err){
        });
      },
      create : function(){
      	return new CreateView();
      },
      show : function(params){
        this.need('forms').spread(function(forms){
          var form = _.findWhere(forms.models, {id:params.id});
          params.render(new ShowView({ model : form }));
        },function(err){
        });
      },

  });
});