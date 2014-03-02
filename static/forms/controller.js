define(['base',
  './create_form_view',
  './index_view',
  './form_view',
  './resources'],function(Base,CreateFormView,IndexView,FormView,Resources){
  return Base.Controller.extend({
      name : 'forms',
      index : function(params){
        this.need('forms').spread(function(forms){
          params.render(new IndexView({ collection : forms }));
        },function(err){
        });
      },
      create_form : function(){
      	return new CreateFormView();
      },
      form : function(params){
        this.need('forms').spread(function(forms){
          var form = _.findWhere(forms.models, {id:params.id});
          params.render(new FormView({ model : form }));
        },function(err){
        });
      },

  });
});