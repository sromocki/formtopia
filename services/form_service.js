var Form = require('../models/form');
var User = require('../models/user');
var Entry = require('../models/entry');
var uuid = require('node-uuid');
module.exports = {
  index : function(request, response) {
    var userId = request.session.passport.user;
    Form.find({userId: userId}, function(err,result){
      response.json(result);
    });
  },
  getForm : function(request, response) {
      Form.findById(request.params.id, function(err,result){
        if(request.params.token === result.token){
          response.redirect('/#guest/forms/entry/'+request.params.id);
        } else {
          response.json(result);
        }
      });
  },
  updateForm : function(request, response) {
    delete request.body['_id'];
    Form.findByIdAndUpdate(request.params.id,request.body,function(err,result){
      response.json(result);
    });
  },
  deleteForm : function(request, response) {
    Form.findByIdAndRemove(request.params.id,function(err,result){
      response.json(result);
    });
  },
  create : function(request, response) {
    request.body.userId = request.session.passport.user;
    request.body.token = uuid.v4();

    Form.create(request.body,function(err,result){
      response.json(result);
    });
  },
  create_entry : function(request, response) {
    request.body.userId = request.session.passport.user;
    Entry.create(request.body,function(err,result){
      response.json(result);
    });
  },
};
