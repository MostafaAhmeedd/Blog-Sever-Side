const express = require('express')
const router = express.Router()
const {User} = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
router.get('/SignUp', (req, res) => {
    res.render('signup')
  })
router.post('/signup', async (req, res) => {
  encryptedPassword = await bcrypt.hash(req.body.password, 10);
    try {
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email, 
        password:encryptedPassword,
      });
      if(newUser){res.status(201).json(newUser);}
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'An error occurred while creating a new user.' });
    }
  });
  router.get('/login', (req, res) => {
    // res.render('login')
    res.status(201).json("login page");
  })
  router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email }});
      if (user)
      { 
        const correct= await bcrypt.compare(req.body.password, user.password);
        if(correct)
        {
          const token = jwt.sign(user.id,"secret");
          res.cookie("token", token);
          // console.log(token)
          // res.status(201).json(user);
          res.status(201).json({ message:"logged in successfully "});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'An error occurred while creating a new user.' });
    }
  })
  router.get('/main', (req, res) => {
    res.render('main')
  })
  router.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.status(201).json({ message:"logged out successfully "});
    res.redirect('login');
  });
module.exports = router