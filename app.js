// Basic Lib Import
const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');
const path= require('path');

//.env file import
require('dotenv').config()

// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import
const mongoose =require('mongoose');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Mongo DB Database Connection
let URI=process.env.MONGODB_CONNECTION_STRING;
let OPTION={user:process.env.MONGODB_USER, pass: process.env.MONGODB_PASSWORD, autoIndex:true}
mongoose.connect(URI, OPTION, (error)=>{
    console.log("Connection Success")
    console.log(error)
})

// Routing Implement
app.use("/api/v1", router);

// Route not found
app.use("*", (req, res) => {
    res.status(404).json({
        status: "failed",
        message: "Route Not Found"
    })
});

module.exports=app;