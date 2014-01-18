require.config({
  paths : {
    Handlebars : 'libs/bower_components/handlebars/handlebars',
    hbs : 'libs/bower_components/requirejs-handlebars/hbars',
    backbone : 'libs/bower_components/backbone/backbone',
    mario : 'libs/bower_components/backbone.marionette/lib/backbone.marionette',
    jquery : 'libs/bower_components/jquery/jquery',
    underscore : 'libs/bower_components/lodash/dist/lodash',
    text : 'libs/bower_components/text/text',
    q : 'libs/bower_components/q/q',
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
define(['router','main/controller','backbone','utils/helpers'],function(Router, MainController, Backbone, Helpers){
  new MainController({ $el : $('body') }).mediator.publish('go',{controller : 'main' });
  new Router();
  Backbone.history.start();
});
