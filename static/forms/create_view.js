define(['base','hbs!./create','./model'],function(Base, tmpl, Form){
  return Base.ItemView.extend({
    template : tmpl,
    events : {
      'submit form' : 'addForm',
      'click .add-field' : 'addField'
    },
    initialize : function(){
      this.model = new Form();
    },
    addField : function(){
      this.$('.fields').append("<input class='field' name='field_name' placeholder='field name'><br>");
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
  });
});
