define(['base','./row_view'],function(Base,RowView){
  return Base.CollectionView.extend({
  	itemView: RowView,
 	itemViewOptions: function(model,index){
  		model.set('row_index', index + 1);
 		return {};
 	},
  	initialize: function(){
  	  this.mediator.on('rowRemoved',this.removeRow,this);
  	},
    removeRow : function(params){
      this.collection.remove(params.row);
    },

    });
});