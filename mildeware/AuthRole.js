const jwt = require('jsonwebtoken')

const User = require("../model/User.Model")
const article =require("../model/Article.model")

AuthorizeRole = (...roles)=>{

    return(req,res,next)=>{

        if(!roles.includes(req.user.role)){
            res.send(`Role:${req.user.role} is not allowed to access to this resoureces`)


        }

        next()
    }
}

 module.exports = AuthorizeRole