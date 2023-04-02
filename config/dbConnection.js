const mongoose=require('mongoose');
require('dotenv').config({path:'backend/config/config.env'});

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI).then(res=>{
    console.log(`db connected successfully ${res.connection.host} `);
})
}

module.exports=connectDatabase

