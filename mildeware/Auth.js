
const jwt = require('jsonwebtoken')

const User = require("../model/User.Model")
const Article =require("../model/Article.model")
 isAunthenticatedUser =async (req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        return next("Please login to acces this account",401)
    } 
    else{

        console.log (token)
    
        const decodeData = jwt.verify(token,process.env.JWT_SECERT )
    
        req.user = await User.findById(decodeData.id)
       
        next()

    }

   

  
   
   


}

 module.exports = isAunthenticatedUser








