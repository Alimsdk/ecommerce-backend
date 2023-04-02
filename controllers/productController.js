const ErrorHandler = require('../errors/errorHandler');
const productModel=require('../models/productModel');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../features/apiFeatures');

// get all products

exports.getAllProducts=catchAsyncErrors(async(req,res)=>{
    const apiFeature=new ApiFeatures(productModel.find(),req.query).search().filter().pagination(5);
    const productCount=await productModel.countDocuments();
    const products=await apiFeature.query;
    
    res.status(200).json({
        success:true,
        message:products,
        productCount
    })
})

// create a new product -- admin

exports.createProduct=catchAsyncErrors(async(req,res)=>{
    req.body.user=req.user.id;
    const product=await productModel.create(req.body);
    res.status(201).json({
        success:true,
        message:product
    })
})

// update a product -- admin


exports.updateProduct=catchAsyncErrors(async(req,res)=>{
    let product=await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('product not found',404))
    }
    
    product=await productModel.findByIdAndUpdate(req.params.id,req.body);
    
    res.status(200).json({
        success:true,
        message:product
    })
})

// delete a product --admin

exports.deleteProduct=catchAsyncErrors(async(req,res)=>{
    let product=await productModel.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product not found',404))
    }
    
    await product.remove();

    res.status(200).json({
        success:true,
        message:"product deleted"
    })
})

// get  product detail 

exports.getProductDetail=catchAsyncErrors(async(req,res,next)=>{

    const product=await productModel.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product not found',404))
    }

    res.status(200).json({
        success:true,
        message:product
    })

})