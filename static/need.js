define(['q','resource'],function(Q,Resource){
  var registry = {};
  var getDeps = function() {
    var deps = _.reduce(arguments,function(memo,arg){
      if (!(arg instanceof Array)) { arg = [arg]; }
      memo.push.apply(memo,arg);
      return memo;
    }, []);
    return Q.all(_.map(deps,getDep));
  }
  var getDep = function(dep) {
    var res = registry[dep];
    if (!res){
      throw new Error("No resource found: '"+dep+"'");
    }
    return getDeps(res.deps).then(function(depValues){
      return res.produceResult.apply(res,depValues);
    });
  }
  getDeps.registerResource = function(name, Res){
    if (registry[name]){
      throw new Error("Resource already registered: "+name);
    }
    registry[name] = new Res;
  };
  getDeps.Resource = Resource;
  getDeps.Q = Q;
  return getDeps;
});