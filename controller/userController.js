
const User = require("../model/User.Model");
const sendToken = require("../utils/jwtToken");

// Register user 

exports.registerUser = async (req, res, next) => {

    const { Name, location, speciality, email, password ,role} = req.body;

    const user = await User.create({
        Name,
        email,
        password,
        location,
        speciality,
        role


    });

    sendToken(user,200,res)
   
    //  OR
    // const Token = user.getJWTToken()

    // res.status(201).json({
    //     success: true,
    //     user,
    //     Token


    // })

}




exports.getRegisterdata =async (req,res,next)=>{

    const user = await User.find()
     
    res.status(200).json({
        success:true,
        user
    })

}

// for login

exports.loginUser = async (req,res,next) => {


    const { email, password } = req.body

    // checking if user  has  is given passsword and email both
    
    if(!email||!password){

        return next("Please enter your email and password",400)
    }
  const user = await User.findOne({email}).select("+password")
  
   if(!user){
       return next("Invalid Email and password",401)
   }

   const isPasswordMatched = await user.comparePassword(password)

   if(!isPasswordMatched){
       return next("Invaild Email and Password",400)
   }

   else{
    // const Token = user.getJWTToken()

    // res.status(200).json({
    //     success:true,
    //     // Token
    // })

     sendToken(user,200,res)
   }




}


// Logout User 


exports.logoutUser = async(req,res,next)=>{


     res.cookie("token",null,{
         expires: new Date(Date.now()),

         httpOnly:true

     })

    res.status(200).json({
        success :true,
        message : "Logged Out"
    })



}








 // get data by using  only id 

exports.findOne = (req, res) => {

    const userId = req.params.id
    console.log(userId);

     User.findOne({ '_id': userId })
        .then(data => {
            res.send(data)
        })
}




// delete Article


exports.deleteUser = async (req, res, next) => {


    const user = await User.findById(req.params.id);


    if (!user) {
        return res.status(500).json({
            success: false,
            message: "user not found"
        })
    }

    await user.remove()

    res.status(200).json({
        success: true,
        message: "user deleted succcessully"
    })
}