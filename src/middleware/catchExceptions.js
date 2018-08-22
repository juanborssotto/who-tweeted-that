const catchExceptions = func => {
  return (req, res, next) => {
    Promise.resolve(func(req, res)).catch(exception => {
      //Catch different types of your custom exceptions
      res.status(500).render('errors/default', {'errorMsg': exception.message});
    });
  };
};

module.exports = catchExceptions;