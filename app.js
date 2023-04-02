const cookieParser = require('cookie-parser');
const express=require('express');
const errorMiddleware = require('./middleware/error');
const app=express();
require('dotenv').config({path:'backend/config/config.env'});

app.use(express.json());
app.use(cookieParser());

// import product route
const products=require('./routes/productRoutes');
const users=require('./routes/userRoute');

app.use('/api/v1',products);
app.use('/api/v1',users);

// error handling middleware

app.use(errorMiddleware);

module.exports=app;