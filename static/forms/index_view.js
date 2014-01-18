define(['base','./form_detail_view'],function(Base,FormView){
  return Base.CollectionView.extend({
    itemView : FormView,
    className : 'forms',
  });
});