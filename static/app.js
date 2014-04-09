require.config({
  paths : {
    Handlebars : 'libs/handlebars/handlebars',
    hbs : 'libs/requirejs-handlebars/hbars',
    backbone : 'libs/backbone/backbone',
    modelbinder : 'libs/backbone.modelbinder/Backbone.ModelBinder',
    mario : 'libs/backbone.marionette/lib/backbone.marionette',
    jquery : 'libs/jquery/dist/jquery',
    underscore : 'libs/lodash/dist/lodash',
    text : 'libs/text/text',
    q : 'libs/q/q',
  },
  shim : {
    backbone : {
      deps : ['jquery','underscore'],
      exports : 'Backbone',
    },
    Handlebars : {
      exports : 'Handlebars',
    },
    mario : {
      exports : 'Backbone.Marionette',
      deps : ['backbone'],
    },
  },
});
define(['router','controllers/main_controller','backbone','utils/helpers'],function(Router, MainController, Backbone, Helpers){
  var router = new Router();
  var c = new MainController({ $el : $('body') }).mediator.publish('go',{controller : 'main' });

  window.bamfrouter = router;

  Backbone.history.start({pushState: true});
});
