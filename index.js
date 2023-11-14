const Joi = require('joi');
const winston = require('winston');
require("express-async-errors");
require("winston-mongodb");

const config=require("config");
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const dotenv =require('dotenv').config();
require("./startup/db")();

require("./startup/routes")(app);
// console.log("here")
// console.log(process.env.jwtPrivateKey)

winston.handleExceptions(
        new winston.transports.File({ filename:"uncaughtExpections.log"}))
process.on("unhandledRejection",(ex)=>{
        throw ex;
})

winston.add(winston.transports.File,{filename: "logfile.log"});
winston.add(winston.transports.MongoDB,{db: "mongodb://127.0.0.1:27017/vidly"
        
});
// try {
//         var p=1
//         if(p<3){
//         } 
// } catch (error) {
//         throw new Error("ISuue occured")
        
// const p = Promise.reject(new Error("something failed miserably"));
// throw new Error("ISuue occured")


// p.then(()=>console.log("done"));





if(!process.env.jwtPrivateKey){
        console.error("FATAL ERROR:jwtPrivateKey is not defined.")
        process.exit(1)
}



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));