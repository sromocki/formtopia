var Form = require('./models/form');
module.exports = {
  index : function(request, response) {
    Form.find(function(err,result){
      response.json(result);
    });
  },
  create : function(request, response) {
    Form.create(request.body,function(err,result){
      response.json(result);
    });
  },
};
