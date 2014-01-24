define(['base',
  'hbs!./create',
  './model',
  './components/rows/row_view',
  './components/rows/model'
  ],function(Base, tmpl, Form, RowView, Row){
  return Base.ItemView.extend({
    template : tmpl,
    defaultRowCount : 1,
    events : {
      'submit form' : 'saveForm',
      'click .add-row-btn' : 'addRow'
    },
    initialize : function(){
      this.model = new Form();
    },

    onRender: function(){
      if(!this.model.get('row_index')){
           this.model.set('row_index',0);
       } 
       _(this.defaultRowCount).times(function(n){
        this.model.set('row_index',this.model.get('row_index')+1);
         var rowView = new RowView({model: new Row({row_index:this.model.get('row_index')})});
         rowView.render();
         this.$('.form-body').prepend(rowView.el);
       },this);
    },
    
    addRow : function(e){
      this.model.set('row_index',this.model.get('row_index')+1);
      var rowView = new RowView({model: new Row({row_index:this.model.get('row_index'), field_index:this.$('.field').length})});
      rowView.render();
      this.$('.form-body').append(rowView.el);
    },
    saveForm : function(e){
      e.preventDefault();
      var fields = [];
      this.$('.field-input').each(function(index){
        fields.push({id: index, name: $(this).val(), value: ''});
      });
      this.model.save({
        form_name : this.$("[name=form_name]").val(),
        form_owner : this.$("[name=form_owner]").val(),
        fields : fields,
      });
    },
  });
});
