
const express = require('express');

const auth =require("../middleware/auth");
const router = express.Router();
const mongoose = require("mongoose");
const{Movie,validate}=require("../models/movie");
const{Genre}=require("../models/genre")


router.get('/', async(req, res) => {
  const movies=await Movie.find().sort("name");
  res.send(movies);
});

router.post('/',auth,async (req, res) => {
 
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre =await Genre.findById(req.body.genreId)
  if (error) return res.status(400).send("invalid genre");


  // let   movie = new Movie ({ if you want see what u just posted use let
    const  movie = new Movie ({
   title: req.body.title,
   genre:{
    _id:genre._id,
    name:genre.name
   },
   numberInStock:req.body.numberInStock,
   dailyRentalRate:req.body.dailyRentalRate
  });
//  movie= await movie.save();you will see this with let up...but commnent under
       await movie.save();
  res.send(movie);
});


router.put('/:id',auth, async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

 const  movie = await Movie.findByIdAndUpdate(req.params.id,{  title: req.body.title,
  genre:{
   _id:genre._id,
   name:genre.name
  },
  numberInStock:req.body.numberInStock,
  dailyRentalRate:req.body.dailyRentalRate

 }
  ,{new:true})
  
  if (!movie) return res.status(404).send('The genre with the given ID was not found.');

  res.send(movie);
});

router.delete('/:id',auth,async (req, res) => { 
  const movie =await Movie.findByIdAndRemove(req.params.id)

  
  if (!movie) return res.status(404).send('The genre with the given ID was not found.');

  
  res.send(movie);
});

router.get('/:id',async (req, res) => {
  const movie = await Movie.findById(req.params.id)

  if (!movie) return res.status(404).send('The genre with the given ID was not found.');
  res.send(movie);
});

module.exports = router;