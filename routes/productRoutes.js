const express=require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail } = require('../controllers/productController');
const { isAuthenticatedUser , authorizeRole} = require('../middleware/auth');

const router=express.Router();

// get all products
router.route('/products').get(isAuthenticatedUser,authorizeRole('admin'),getAllProducts);

// create new product
router.route('/product/new').post(isAuthenticatedUser,authorizeRole('admin'),createProduct);

// update and delete a product

router.route('/product/:id').put(isAuthenticatedUser,authorizeRole('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRole('admin'),deleteProduct).get(getProductDetail);




module.exports=router