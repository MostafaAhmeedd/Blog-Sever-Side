const jwt = require('jsonwebtoken');
const {User,Post} = require('../models');
const checktoken = async(req,res,next) => {
    try{
        const token = req.cookies.token;
        const verified = jwt.verify(token, "secret");
        // const curr_user = User.findByPk(verified)
        if(verified){
            req.user= verified
            return next() }
        else
            {
                res.status(401).json({message:'unauthorized'})
            }
    }
    catch(err)
    {
        res.status(401).json({message:'unauthorized'})
    }
}

module.exports = {checktoken};