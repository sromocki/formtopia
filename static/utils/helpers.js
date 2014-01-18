define(['Handlebars'],function(Handlebars){
  Handlebars.registerHelper('link_to',function(){
    var args = _.initial(arguments);
    return '#' + args.join('/');
  });
});
