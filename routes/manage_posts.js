const express = require('express')
const router = express.Router()
const {User,Post} = require('../models');
const upload = require('../services/multer.js');
const {checktoken,checkUser} = require('../services/checktoken')
router.post('/addpost',checktoken,upload.single("image"), async (req, res) => {
  console.log(req.user)
  try{
    const post = await Post.create({
        title :req.body.title,
        content: req.body.content,
        image:req.file.path,
        userId : req.user
      });
    // res.status(401).json({post})
    if(post){res.status(201).json("Post added successfully")}
}
catch(err){
    res.status(401).json("False")
}
})
router.get('/view-single-post/:id',checktoken,checkUser, async (req, res) => {
  try{
}
catch{
  res.status(401).json("error")
}

})
router.get('/viewposts',checktoken, async (req, res) => {

  try{
  // const {page,size} =req.query; 
    const pageASNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);


    let page = 0;
    if (!Number.isNaN(pageASNumber) && pageASNumber>0 )
    {
      page=pageASNumber;
    }

    let size = 3;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber> 0 && sizeAsNumber< size )
    {
      size = sizeAsNumber;
    }

  const posts = await Post.findAndCountAll({
    limit : size,
    offset : page*size,
    attributes: [],
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName'],
        as: 'user',
      },
    ], 
  });
  if(posts){ res.status(201).json({content : posts.rows,
           totalpages: Math.ceil(posts.count/size)})}
  else
  {
    res.status(201).json("No posts available")
  }
  }
catch(err){
  res.status(401).json(err)
}
})
module.exports = router