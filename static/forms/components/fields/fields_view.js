define(['base','./field_view','../../../libs/gridster/dist/jquery.gridster'],function(Base,FieldView,gridster){
  return Base.CollectionView.extend({
	  	itemView: FieldView,
	  	tagName: 'ul',
	  	className: 'gridster',
	  	max_cols: 10,
	  	itemViewOptions: function(model, index) {
		    return {
		      itemIndex: index
		    };
		},
		itemViewEventPrefix : "field",
	  	buildItemView: function(item,itemViewType,itemViewOptions){
	  		var options = _.extend({model: item}, itemViewOptions);
	  		var view = new itemViewType(options);
	  		item.set("itemIndex", view.options.itemIndex);
	  		view.$el.attr({
	  			'data-row' : item.get('position').row,
	  			'data-col' : item.get('position').col,
	  			'data-sizex' : item.get('position').size_x, 
	  			'data-sizey' : item.get('position').size_y,
	  			'data-index' : view.options.itemIndex
	  		});
	  		return view;
	  	},
	  	onCollectionBeforeRender : function(){
	  		this.mediator.on('fieldRemoved', this.fieldRemoved, this);
	  		this.constructGrid();
	  	},
	  	constructGrid : function(){
	  		if(!this.gridster){
			  		this.gridster = this.$el.gridster({
		               widget_margins: [10, 10],
		               widget_base_dimensions: [90, 65],
		               max_cols: this.max_cols,
		               min_cols: 10,
		               serialize_params : _.bind(this.serializeWidget,this),
		               draggable : {
		                  stop  : _.bind(this.updateWidgets,this),
		                  handle : ".form-group"
		               },
		               resize: {
		                  stop: _.bind(this.updateWidgets, this),
		                  enabled: true,
		                  handle_class: 'widget-resize',
		               }
		            }).data('gridster');
	  		}
	  	},
	  	appendHtml: function(collectionView, itemView, index){
	  		this.gridster.add_widget(itemView.el,
	  			+itemView.el.attributes['data-sizex'].value,
	  			+itemView.el.attributes['data-sizey'].value,
	  			+itemView.el.attributes['data-col'].value,
	  			+itemView.el.attributes['data-row'].value);
	  	},
	  	serializeWidget : function($el, coord){
	      	return {
	          index : $el.attr('data-index'),
	          position : _.omit(coord,'el')
	      	};
    	},
	    updateWidgets : function(){
	      var updatedWidgets = this.gridster.serialize();
	      _.each(updatedWidgets, _.bind(function(widget){
	        var widgetModel = this.collection.findWhere({itemIndex: +widget.index});
	        widgetModel.set('position',widget.position,{silent:true});
	      },this));
	    },
	    fieldRemoved : function(params){
	    	debugger;
	      var fieldEl = this.$('.field[data-index='+params.model.get('itemIndex')+']')[0];
	      this.gridster.remove_widget(fieldEl);
	      this.collection.remove(params.model);
	    },

    });
});