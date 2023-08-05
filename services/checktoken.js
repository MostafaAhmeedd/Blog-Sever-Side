const jwt = require('jsonwebtoken');
const {User,Post} = require('../models');
const checkAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
// const checktoken = async(req,res,next) => {
//     try{
//         const token = req.cookies.token;
//         const verified = jwt.verify(token, "secret");
//         // const curr_user = User.findByPk(verified)
//         if(verified){
//             req.user= verified
//             return next() }
//         else
//             {
//                 res.status(401).json({message:'unauthorized'})
//             }
//     }
//     catch(err)
//     {
//         res.status(401).json({message:'unauthorized'})
//     }
// }
const checkUser = async(req,res,next)=>{
    try{
        // const token = req.cookies.token;
        // const verified = jwt.verify(token, "secret");
        const verified = req.session.userId;
        if(verified){
            const curr_user =await User.findByPk(verified)
            const post = await Post.findByPk(req.params.id,{attributes: ["title","content","image"],include: [
                {
                  model: User,
                  attributes: ["firstName","lastName","id"],
                  as: 'user',
                },
              ]})
            if (curr_user)
            {
                if(post){
                    if (curr_user.id == post.user.id)
                    {
                        // req.user= verified
                        res.render("single-post",{post:post})
                    }
                    else{
                            res.status(401).json({message:'unauthorized'})
                        }
                }
            }  
            }
        else
            {
                res.status(401).json({message:'something went wrong'})
            }
    }
    catch(err)
    {
       console.log(err)
    }
}

module.exports = {checkUser,checkAuth};