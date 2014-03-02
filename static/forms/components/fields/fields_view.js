define(['base','./field_view'],function(Base,FieldView){
  return Base.CollectionView.extend({
	  	itemView: FieldView,
	  	tagName: 'ul',
	  	className: 'gridster',
	  	itemViewOptions: function(model, index) {
		    return {
		      itemIndex: index
		    };
		},
	  	buildItemView: function(item,itemViewType,itemViewOptions){
	  		var options = _.extend({model: item}, itemViewOptions);
	  		var view = new itemViewType(options);
	  		view.$el.attr({
	  			'data-row' : item.get('position').row,
	  			'data-col' : item.get('position').col,
	  			'data-sizex' : item.get('position').size_x, 
	  			'data-sizey' : item.get('position').size_y
	  		});
	  		return view;
	  	}
    });
});