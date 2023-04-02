const ErrorHandler = require("../errors/errorHandler");

module.exports=(err,_req,res,_next)=>{
  err.message=err.message || 'internal server error';
  err.statusCode=err.statusCode || 500;

 
  // if(err.name="CastError"){
  //   const message=`Resource not Found - Invalid ${err.path}`
  //   err = new ErrorHandler(message,400)
  // }

  res.status(err.statusCode).json({
    success:false,
    error:err.message
  })
}