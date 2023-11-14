const mongoose = require("mongoose");
const express = require('express');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {type:String,
    required: true,
    minlength:5,
    maxlength:50},
  
    phone:{type:Number,
      minlength:5,
     maxlength:50,
      required: true,
    },
  
    isGold:{ type:Boolean,
      default:false,
     }
    
  }
  );
  
  const Customer = mongoose.model('Customer',customerSchema);
  

  function validateCustomer(customer) {
    const schema = Joi.object( {
      name: Joi.string().min(5).required(),
      phone: Joi.number().min(5).required(),
      isGold: Joi.boolean().required()
    });
      return schema.validate(customer);
  }
  module.exports.Customer=Customer;
  module.exports.validate=validateCustomer;


  