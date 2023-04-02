const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const userModel=require('../models/userModel');
const ErrorHandler=require('../errors/errorHandler');
const sendToken = require("../utils/sendJwt");
const { sendEmail } = require("../utils/sendMail");

exports.registerUser=catchAsyncErrors(async(req,res)=>{
   const {name,email,password}=req.body;
   const user=await userModel.create({
    name,email,password,avatar:{
        public_id:"profilepic1",
          url:"firstunknownid"
    }
   });
   sendToken(user,201,res);
});

exports.getUsers=catchAsyncErrors(async(req,res)=>{
    let users=req.body;
    users=await userModel.find();
    res.status(200).json({
        success:true,
        users
    })
});

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler('please enter email & password',400))
    }

    const user=await userModel.findOne({email}).select('+password');
    //  যেহেতু পাসওয়ার্ড সিলেক্ট ফলস করা ছিলো তাই ফাইন্ড কুয়েরিতে আসবে নাহ
    // তাই এভাবে আনতে হবে!
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Password',401))
    }
   sendToken(user,200,res);
})

// logout user

exports.logOutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        httpOnly:true,
        expires:new Date(Date.now())
    })

    res.status(200).json({
        success:true,
        message:'logged out successfully'
    })
})

// forgot password

exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler('user not found',404))
    }
    // get reset password token
    const resetToken=user.getResetPasswordToken();

    await user.save({
        validateBeforeSave:false
    });

    const resetPasswordUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message=`your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you haven't requested for this then please ignore this message!`

    try {
        await sendEmail({
            email:user.email,
            subject:'nrikantha shop password reset',
            message
        })
    } catch (error) {
        this.resetPasswordToken=undefined;
        this.resetPasswordExpire=undefined;
        await user.save({
            validateBeforeSave:false
        });
        return next(new ErrorHandler(error.message,500));
    }
})