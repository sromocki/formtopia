var Form = require('./models/form');
module.exports = {
  index : function(request, response) {
    Form.find(function(err,result){
      response.json(result);
    });
  },
  getForm : function(request, response) {
    Form.findById(request.params.id, function(err,result){
      response.json(result);
    });
  },
  create : function(request, response) {
    Form.create(request.body,function(err,result){
      response.json(result);
    });
  },
};
