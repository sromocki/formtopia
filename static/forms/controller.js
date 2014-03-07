define(['base',
  './create_form_view',
  './form_manager_view',
  './form_view',
  './resources'],function(Base,CreateFormView,FormManagerView,FormView,Resources){
  return Base.Controller.extend({
      name : 'forms',
      index : function(params){
        this.need('forms').spread(function(forms){
          params.render(new FormManagerView({ collection : forms }));
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