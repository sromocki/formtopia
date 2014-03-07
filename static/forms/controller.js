define(['base',
  './form_builder_view',
  './form_manager_view',
  './form_view',
  './model',
  './resources'],function(Base,FormBuilderView,FormManagerView,FormView,FormModel,Resources){
  return Base.Controller.extend({
      name : 'forms',
      index : function(params){
        this.need('forms').spread(function(forms){
          params.render(new FormManagerView({ collection : forms }));
        },function(err){
        });
      },
      form_builder : function(params){
        if(params.id){
            this.need('forms/'+params.id).spread(function(model){
                params.render(new FormBuilderView({model:model}));
            },function(err){
            });
        } else {
          return new FormBuilderView();
        }
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
