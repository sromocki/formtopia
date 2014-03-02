define(['Handlebars'],function(Handlebars){
  Handlebars.registerHelper('link_to',function(){
    var args = _.initial(arguments);
    return '#' + args.join('/');
  });
  Handlebars.registerHelper('ifequals', function(context, options) {
	var passed = _.all(options.hash, function(val, key, hash){
      return context[key] == val;
    });

    if (passed) {
      return options.fn(context);
    } else {
      return options.inverse(context);
    }
  });
  Handlebars.registerHelper("contains", function(list,value,options) {
        if (_.contains(list, value)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });   
});
