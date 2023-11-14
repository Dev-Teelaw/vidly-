
const winston =require("winston")
const mongoose = require("mongoose");
module.exports = function(){

    mongoose.connect("mongodb://127.0.0.1:27017/vidly", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } )

        .then(()=>winston.info("connected to mongodb..."))
        .catch(err=>console.error("could not conect to mongodb",err))


}