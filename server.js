const app=require('./app');
const connectDB=require('./config/dbConnection');

// handling uncaught exception (like a variable is consoled which doesn't exist)
// write this above
process.on('uncaughtException',(err)=>{
    console.log(err);
    console.log('shutting down server due to uncaught exception');
    process.exit(1);
})


// calling database
connectDB();

const server=app.listen(process.env.PORT || 8000,()=>{
    console.log(`listening to port ${process.env.PORT || '8000'}`);
});


// unhandled promise rejection (like DB_URI mistakes)

process.on('unhandledRejection',(err)=>{
    console.log(err.message);
    console.log('shutting down the server');
    server.close(()=>{
        process.exit(1);
    })
})