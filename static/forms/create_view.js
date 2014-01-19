define(['base',
  'hbs!./create',
  './model',
  './components/fields/field_view',
  './components/fields/model'],function(Base, tmpl, Form, FieldView, Field){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
      'submit form' : 'addForm',
      'click .add-field-btn' : 'addField',
      'click .add-row-btn' : 'addRow'
    },
    defaultFieldCount : 3,
    initialize : function(){
      this.model = new Form();
    },
    onRender: function(){
       _(this.defaultFieldCount).times(function(n){
         var fieldView = new FieldView({model: new Field({form_index:n})});
         fieldView.render();
         this.$('.field-row').prepend(fieldView.el);
       },this);
    },
    addField : function(e){
      debugger;
      //e.currentTarget.parentNode.parentNode.append
      //this.$('.field-row').append("<input class='field' name='field_name' placeholder='field name'>");
    },
    addForm : function(e){
      //TODO: make it possible to add any number of fields with any name
      e.preventDefault();
      var fields = [];
      this.$('.field').each(function(index){
        fields.push({name: $(this).val(), value: ''});
      });
      this.model.save({
        form_name : this.$("[name=form_name]").val(),
        form_owner : this.$("[name=form_owner]").val(),
        fields : fields,
      });
    },
    addRow : function(e){

    },
  });
});
