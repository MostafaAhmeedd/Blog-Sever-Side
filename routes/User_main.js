const express = require('express')
const router = express.Router()
const {User} = require('../models');
const jwt = require('jsonwebtoken');
const  {signupValidation,loginValidation} =require('../services/User_Validation');
const bcrypt = require('bcrypt');
const { check, validationResult }
    = require('express-validator');
router.get('/signup', (req, res) => {
    res.render('signup')
  })
router.post('/signup',signupValidation,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors)
  }
  else{
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
      try {
        if(req.body.email != null){
        const duplicate = await User.findOne({where:{email:req.body.email }
        })
      if (duplicate == null)
      {
        const newUser = await User.create({
          firstName: req.body.firstName,
          lastName:req.body.lastName,
          email: req.body.email, 
          password:encryptedPassword,
        });
        if(newUser){
          const token = jwt.sign(newUser.id,"secret");
          res.cookie("token", token);
          res.redirect("viewposts")
        }
      } 
    else
    {
      res.status(200).json({message:"Email already exists"});
    } 
  }
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'An error occurred while creating a new user.' });
      }}
    });  
  router.get('/login', (req, res) => {
    res.render('login')
    // res.status(201).json("login page");
  })
  router.post('/login',loginValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors)
  }
  else{
    try {
      const user = await User.findOne({ where: { email: req.body.email }});

      if (user)
      { 
        const correct= await bcrypt.compare(req.body.password, user.password);

        if(correct)
        {
          console.log(user)
          const token = jwt.sign(user.id,"secret");
          res.cookie("token", token);
          // console.log(token)
          // res.status(201).json(user);
          // res.status(201).json({ message:"logged in successfully "});
          // window.location.href = "/user/viewposts";
          res.redirect("viewposts")
        }
        else
        {
          res.status(201).json({ message:"Incorrect pass or email "});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'An error occurred while login.' });
    }}
  })
  router.get('/main', (req, res) => {
    res.render('main')
  })
  router.get('/logout', (req, res) => {
    res.clearCookie("token")
     
    res.redirect('login');
  });
module.exports = router