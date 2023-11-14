const mongoose = require("mongoose");
const Joi = require('joi');
const jwt =require("jsonwebtoken");
const dotenv =require('dotenv').config();


const userSchema = new mongoose.Schema({
    name: {type:String,
    required: true,
    minlength:5,
    maxlength:50},
    email:{
        type:String,
        unique:true,
        required:true,
        maxlength:255 
    },
    password:{
        type:String,
        required:true,
        maxlength:255,

    },
    isAdmin:Boolean 
  });

  userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id ,isAdmin: this.isAdmin}, process.env.jwtPrivateKey)
    console.log("token from model "+token)
    return token;

  }
  
  const User = mongoose.model('User',userSchema);


  function validateUser(user) {
    const schema = Joi.object( {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required() 
    });
      
    return schema.validate(user);
  }
  module.exports.User=User;
  module.exports.validate=validateUser;