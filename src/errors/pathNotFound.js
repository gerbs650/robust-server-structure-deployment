// == Path Not Found Handler ==

  function pathNotFound(req, res, next){
  return next({
    status: 404, 
    message: `Not found: ${req.originalUrl}`
  });
};

module.exports = pathNotFound;