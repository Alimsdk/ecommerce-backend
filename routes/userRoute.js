const express=require('express');
const { registerUser, getUsers, loginUser, logOutUser } = require('../controllers/userController');

const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/users').get(getUsers);
router.route('/logout').get(logOutUser);


module.exports=router;