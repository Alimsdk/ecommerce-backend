const ErrorHandler = require("../errors/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel');

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler('please login to access resources',401))
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await userModel.findById(decodedData.id);

    next();
})

exports.authorizeRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`your role ${req.user.role} can't access this info`,403))
        }
        next();
    }
  
}