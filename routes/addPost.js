const express = require('express')
const router = express.Router()
const path = require('path')
const {User,Post} = require('../models');
const upload = require('../services/multer.js');
const {checktoken} = require('../services/checktoken')
router.get('/main_page',checktoken, async (req, res) => {}
)
router.post('/addpost',checktoken,upload.single("image"), async (req, res) => {
  try{
    const post = await Post.create({
        title :req.body.title,
        content: req.body.content,
        image:req.file.path,
        userId : req.user
      });
      console.log("dasdasdas")
    // res.status(401).json({post})
    if(post){res.redirect("viewposts")}
}
catch(err){
  console.log(err)
}
})
router.get('/viewposts',checktoken, async (req, res) => {
  try{
  const posts = await Post.findAll({
    attributes: ['title', 'content', 'image'],
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName'],
        as: 'user',
      },
    ],
  });
  if(posts){
    //  console.log(posts)
    //  res.status(201).json({posts})
      res.render("main.ejs",{posts:posts})
    }
  else
  {
    res.status(201).json("No posts available")
  }
  }
catch{
  res.status(401).json("error")
}


})
module.exports = router