define(['base','./entry_field'],function(Base,EntryField){
  return Base.Collection.extend({
    model : EntryField,
  });
});
