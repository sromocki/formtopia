var express = require('express');
var exp_hbs = require('express3-handlebars');
var app = express();
require('mongoose').connect('mongodb://localhost/test');
app.engine('hbs', exp_hbs({defaultLayout: 'main', extname : '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.errorHandler({
  dumpExceptions: true,
  showStack: true
}));
app.use(express.json());
app.use('/static',express.static(__dirname + '/static'));
app.get('/',function(request,response){
  response.render('landing');
});
app.get('/forms',require('./form_service').index);
app.get('/forms/:id',require('./form_service').getForm);
app.put('/forms/:id',require('./form_service').updateForm);
app.post('/forms',require('./form_service').create);
app.listen('9000');
