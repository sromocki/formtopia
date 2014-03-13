define(['base',
  './form_builder_view',
  './form_manager_view',
  './form_view',
  './model',
  './resources'],function(Base,FormBuilderView,FormManagerView,FormView,FormModel,Resources){
  return Base.Controller.extend({
      name : 'forms',
      initialize : function(){
        this.mediator.subscribe('preview_form',this.preview_form,this);
      },
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
        this.need('forms/'+params.id).spread(function(model){
          params.render(new FormView({model:model}));
        },function(err){
        });
      },

  });
});
