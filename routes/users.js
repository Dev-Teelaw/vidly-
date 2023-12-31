const express = require('express');
const auth =require('../middleware/auth');
const jwt =require("jsonwebtoken");
const dotenv =require('dotenv').config();
const bcrypt=require("bcrypt")
const _=require("lodash")
const router = express.Router();
const mongoose = require("mongoose");
const{User,validate}=require("../models/user")


// router.get('/', async(req, res) => {
//   const genres=await Genre.find().sort("name");
//   res.send(genres);
// });

router.get('/me',auth,async(req,res)=>{
const user =await User.findById(req.user._id).select('-password')
res.send(user);
})
router.post('/',async (req, res) => {
 
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne ({email: req.body.email});
  if(user)return res.status(400).send("user already registered ")

  user = new User ( _.pick(req.body,["name","email","password"])
   );
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password,salt)
  await user.save();
  const token= user.generateAuthToken(user.isAdmin)
  console.log("the tokn "+token)

  res.header('x-auth-token',token).send(_.pick(user,["_id","name","email"]));
});


// router.put('/:id', async(req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//  const  genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
  
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(genre);
// });

// router.delete('/:id',async (req, res) => { 
//   const genre =await Genre.findByIdAndRemove(req.params.id)

  
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  
//   res.send(genre);
// });

// router.get('/:id',async (req, res) => {
//   const genre = await Genre.findById(req.params.id)

//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//   res.send(genre);
// });

module.exports = router; 